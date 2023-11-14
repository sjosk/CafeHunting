/* Link to Datasearch.html */
// The first method we have tried to link the database
let currentData = []; 
let currentMarker = null; 
let currentPage = 1;
const itemsPerPage = 10;
var map;
var markerArray = [];
var dataArray = [];
var latlngArray = [];
var infowindow = new google.maps.InfoWindow({maxWidth: 300});
var isInfoWindowOpen = false; // To check whether the info window is open or not
var users = {
	url: './img/user.png',
	scaledSize: new google.maps.Size(45, 45),
	}
var icona = {
	url: './img/cafe.png',
	scaledSize: new google.maps.Size(35, 35),
	}


$(document).ready(function() {

	function initialize() {
		// points to our API Look at Cafe Database for the values you need
		var url = "http://casa0017.cetools.org:8816/Table/Cafe";

		$.getJSON( url , function( data ) {
			
			//Create the markers with the loop
			$.each(data, function( k, v ) {
				var latLng = new google.maps.LatLng(parseFloat(v.latitude), parseFloat(v.longitude));
				dataArray.push(latLng);
				var marker = new google.maps.Marker({
					 position: latLng,
                      icon: icona,
					map: map,
					customInfo: {
						name: v.name,
						city: v.city,
						wifi: v.wifi,
						seat: v.seat,
						quiet: v.quiet,
						cheap: v.cheap,
						music: v.music,
						url: v.url,
						address: v.address,
						limited_time: v.limited_time,
						socket: v.socket,
						standing_desk: v.standing_desk,
						open_time: v.open_time
					}
				 });

				


				// //Using Flickr API to get the photo as an example(waiting for our database)
				google.maps.event.addListener(marker, 'click', function () {
					infowindow.setContent(""); 
			
					// Use svg icons to display instead of text content
					var wifiIcon = '';
					if (marker.customInfo.wifi >= 4) {
						wifiIcon = 'wifi1.svg';
					} else if (marker.customInfo.wifi === 3) {
						wifiIcon = 'wifi2.svg';
					} else if (marker.customInfo.wifi <= 2) {
						wifiIcon = 'wifi3.svg';
					}
					
					var seatIcon = '';
					if (marker.customInfo.seat >= 4) {
						seatIcon = 'seat1.svg';
					} else if (marker.customInfo.seat === 3) {
						seatIcon = 'seat2.svg';
					} else if (marker.customInfo.seat <= 2) {
						seatIcon = 'seat3.svg';
					}

					var socketIcon = '';
					if (marker.customInfo.socket === 'yes') {
						socketIcon = 'socket1.svg';
					} else if (marker.customInfo.socket === 'no') {
						socketIcon = 'socket3.svg';
					} else if (marker.customInfo.socket === 'maybe') {
						socketIcon = 'socket2.svg';
					} else if (marker.customInfo.socket === '') {
						socketIcon = 'socket4.svg';
					}

					var quietIcon = '';
					if (marker.customInfo.quiet >= 4) {
						quietIcon = 'quiet1.svg';
					} else if (marker.customInfo.quiet === 3) {
						quietIcon = 'quiet2.svg';
					} else if (marker.customInfo.quiet <= 2) {
						quietIcon = 'quiet3.svg';
					}

					var cheapIcon = '';
					if (marker.customInfo.cheap >= 4) {
						cheapIcon = 'cheap1.svg';
					} else if (marker.customInfo.cheap === 3) {
						cheapIcon = 'cheap2.svg';
					} else if (marker.customInfo.cheap <= 2) {
						cheapIcon = 'cheap3.svg';
					}

					var musicIcon = '';
					if (marker.customInfo.music >= 4) {
						musicIcon = 'music1.svg';
					} else if (marker.customInfo.music === 3) {
						musicIcon = 'music2.svg';
					} else if (marker.customInfo.music <= 2) {
						musicIcon = 'music3.svg';
					}

					var limitedTimeIcon = '';
					if (marker.customInfo.limited_time === 'no') {
						limitedTimeIcon = 'limited-time-1.svg';
					} else if (marker.customInfo.limited_time === 'yes') {
						limitedTimeIcon = 'limited-time-3.svg';
					} else if (marker.customInfo.limited_time === 'maybe') {
						limitedTimeIcon = 'limited-time-2.svg';
					} else if (marker.customInfo.limited_time === '') {
						limitedTimeIcon = 'limited-time-4.svg';
					}

					var standingdeskIcon = '';
					if (marker.customInfo.standing_desk === 'yes') {
						standingdeskIcon = 'desk1.svg';
					} else if (marker.customInfo.standing_desk === 'no') {
						standingdeskIcon = 'desk3.svg';
					} else if (marker.customInfo.standing_desk === 'maybe') {
						standingdeskIcon = 'desk2.svg';
					} else if (marker.customInfo.standing_desk === '') {
						standingdeskIcon = 'desk4.svg';
					}

					var content = `
						<b>Name:</b> ${marker.customInfo.name}<br>
						<b>City:</b> ${marker.customInfo.city}<br>
						<b>Address:</b> ${marker.customInfo.address}<br>
						<img src="img/icons/${wifiIcon}" width="25" height="25">
						<img src="img/icons/${seatIcon}" width="25" height="25">
						<img src="img/icons/${socketIcon}" width="25" height="25">
						<img src="img/icons/${quietIcon}" width="25" height="25">
						<img src="img/icons/${cheapIcon}" width="25" height="25">
						<img src="img/icons/${musicIcon}" width="25" height="25">  
						<img src="img/icons/${limitedTimeIcon}" width="25" height="25">
						<img src="img/icons/${standingdeskIcon}" width="25" height="25"> <br>
						<b>Open Time:</b> ${marker.customInfo.open_time}<br>
						<b>URL:</b> <a href="${marker.customInfo.url}" target="_blank">${marker.customInfo.url}</a>
					`; 
			
					infowindow.setContent(content);
					infowindow.open(map, marker);
				});
			
				markerArray.push(marker);
			});

					setAllMap(map);
		});
	}


	// Start the map using a function
	google.maps.event.addDomListener(window, 'load', initialize);
	initialize();
});



function createMarkers(){
	var marker = new google.maps.Marker({
		  position: latLng 
							
	  });
}

function setAllMap(map) {
	//console.log(markerArray.length);
	for (var i = 0; i < markerArray.length; i++) {
		markerArray[i].setMap(map);
	}
}

function clearMarkers() {
	setAllMarkers(null);
}



function fetchData() {
    return fetch("http://casa0017.cetools.org:8816/Table/Cafe")
        .then(response => response.json())
        .catch(error => console.error("Error fetching data: ", error));
}

//Search
async function search() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const data = await fetchData();
    currentData = data.filter(item => item.name.toLowerCase().includes(searchTerm));
    displayResults(currentData);
}


function displayResults(data) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = ''; 

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = data.slice(startIndex, endIndex);

    
    paginatedItems.forEach((result, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td><img src="img/icons/cafe.png" width="10px" height="10px"></img>${result.name}</td>
                        <td style="display:none;">${result.latitude}</td>
                        <td style="display:none;">${result.longitude}</td>
                        <td><button id="markerBtn" data-latitude="${result.latitude}" data-longitude="${result.longitude}" onclick="addMarker(this)">📍</button></td>`;
        resultsContainer.appendChild(tr);
    });

    createPaginationButtons(data.length);
}



function addMarker(btn) {
    const lat = parseFloat(btn.getAttribute('data-latitude'));
    const lng = parseFloat(btn.getAttribute('data-longitude'));

    if (currentMarker) {
        currentMarker.setMap(null);
    }

    currentMarker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        icon:users,
    });

    map.setCenter({ lat, lng });
    map.setZoom(17); 
}


function sortTable(column) {
    currentData.sort((a, b) => {
        if (a[column] < b[column]) {
            return -1;
        }
        if (a[column] > b[column]) {
            return 1;
        }
        return 0;
    });
    displayResults(currentData); 
}

function setMapCenter() {
  
    var select = document.getElementById("stationSelect");
    var station = select.value.split(",");
    var marker = new google.maps.Marker({
        map: map,
        icon: mrt,
    });

    if (station.length === 2) {
        var latLng = new google.maps.LatLng(parseFloat(station[0]), parseFloat(station[1]));
        map.setCenter(latLng);
        marker.setPosition(latLng);
        map.setZoom(17);
        
        if (circle) {
            circle.setMap(null); 
        }
        circle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.2,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.04,
            map: map,
            center: latLng,
            radius: 200,
        });
        circle = new google.maps.Circle({
            strokeColor: '#6d6464',
            strokeOpacity: 0.2,
            strokeWeight: 1,
            fillColor: '#ffc700',
            fillOpacity: 0.09,
            map: map,
            center: latLng,
            radius: 500,
        });
       
    }

   
    if (button) {
        button.disabled = false;
    }
}


var markers = [];
var circles = [];
var circle; 
var button = document.getElementById('stationSelect'); 

function createPaginationButtons(totalItems) {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = ''; 

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    addButton(paginationContainer, "|<", 1);
    addButton(paginationContainer, "<", Math.max(1, currentPage - 1));
    addButton(paginationContainer, `(${currentPage})`, currentPage);
    addButton(paginationContainer, ">", Math.min(totalPages, currentPage + 1));
    addButton(paginationContainer, ">|", totalPages);
}

function addButton(container, text, page) {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.onclick = function() { changePage(page); };
    btn.disabled = currentPage === page; 
    container.appendChild(btn);
}

function changePage(page) {
    currentPage = page;
    displayResults(currentData); 
}

