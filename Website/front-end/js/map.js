var map;
var markerArray = [];
var dataArray = [];
var latlngArray = [];
var infowindow = new google.maps.InfoWindow({maxWidth: 300});
var isInfoWindowOpen = false; // To check whether the info window is open or not
var icon = {
	url: './img/cafe.png',
	scaledSize: new google.maps.Size(35, 35),
	}
var user = {
	url: './img/user.png',
	scaledSize: new google.maps.Size(50, 50),
	}

$(document).ready(function() {

// Add worfing mode
// Initialize the state of the work button
let workButtonChecked = false;

$('#workButton').click(function() {
    // Toggle the state of the work button
    workButtonChecked = !workButtonChecked;

    // turn on the buttons for Wi-Fi, seats, quiet, socket, and standing desk, and turn off the other buttons.
    $('#wifiToggle').prop('checked', true);
    $('#seatsToggle').prop('checked', true);
    $('#quietToggle').prop('checked', true);
    $('#socketToggle').prop('checked', true);
    $('#standingDeskToggle').prop('checked', true);

    //Close other buttons
    $('#cheapToggle').prop('checked', false);
    $('#musicToggle').prop('checked', false);
    $('#limitedTimeToggle').prop('checked', false);

    displayGeneratedUrl();
});


	// Clear all filters
	$('#clearFiltersButton').click(function() {
		$('#wifiToggle').prop('checked', false);
		$('#seatsToggle').prop('checked', false);
		$('#quietToggle').prop('checked', false);
		$('#socketToggle').prop('checked', false);
		$('#standingDeskToggle').prop('checked', false);
		$('#cheapToggle').prop('checked', false);
		$('#musicToggle').prop('checked', false);
		$('#limitedTimeToggle').prop('checked', false);

		displayGeneratedUrl();
	});


    // Initialize variable value
	let wifi = '';
	let seat = '';
	let quiet = '';
	let socket = '';
	let standing_desk = '';
	let cheap = '';
	let music = '';
	let limited_time = '';


    // Get the sliding button and the element that displays the URL
    const wifiToggle = document.getElementById('wifiToggle');
    const seatsToggle = document.getElementById('seatsToggle');
	const quietToggle = document.getElementById('quietToggle');
	const socketToggle = document.getElementById('socketToggle');
	const standingDeskToggle = document.getElementById('standingDeskToggle');
	const cheapToggle = document.getElementById('cheapToggle');
	const musicToggle = document.getElementById('musicToggle');
	const limitedTimeToggle = document.getElementById('limitedTimeToggle');
    const generatedUrlElement = document.getElementById('generatedUrl');

    // When the sliding button Wifi is toggled, switch the wifi variable value
    wifiToggle.addEventListener('change', function() {
		wifi = wifiToggle.checked ? 3 : '';
		displayGeneratedUrl();
	});

    // switch the seat variable value
    seatsToggle.addEventListener('change', function() {
		seat = seatsToggle.checked ? 3 : '';
		displayGeneratedUrl();
    });

	// switch the quiet variable value
	quietToggle.addEventListener('change', function() {
		quiet = quietToggle.checked ? 3 : '';
		displayGeneratedUrl();
		});

	// switch the socket variable value
	socketToggle.addEventListener('change', function() {
		socket = socketToggle.checked ? 'yes' : '';
		displayGeneratedUrl();
		});

	// switch the standing_desk variable value
	standingDeskToggle.addEventListener('change', function() {
		standing_desk = standingDeskToggle.checked ? 'yes' : '';
		displayGeneratedUrl();
	});

	// switch the cheap variable value
	cheapToggle.addEventListener('change', function() {
		cheap = cheapToggle.checked ? 3 : '';
		displayGeneratedUrl();
	});

	// switch the music variable value
	musicToggle.addEventListener('change', function() {
		music = musicToggle.checked ? 3 : '';
		displayGeneratedUrl();
	});

	// switch the limited time variable value
	limitedTimeToggle.addEventListener('change', function() {
		limited_time = limitedTimeToggle.checked ? 'no' : '';
		displayGeneratedUrl();
	});

    // Display the generated URL on the page
    function displayGeneratedUrl() {
      const baseURL = 'http://casa0017.cetools.org:8816/Table/Cafe';
      const url = new URL(baseURL);
	  url.searchParams.append('wifi', $('#wifiToggle').is(':checked') ? 3 : '');
	  url.searchParams.append('seat', $('#seatsToggle').is(':checked') ? 3 : '');
	  url.searchParams.append('quiet', $('#quietToggle').is(':checked') ? 3 : '');
	  url.searchParams.append('socket', $('#socketToggle').is(':checked') ? 'yes' : '');
	  url.searchParams.append('standing_desk', $('#standingDeskToggle').is(':checked') ? 'yes' : '');
	  url.searchParams.append('cheap', cheap);
	  url.searchParams.append('music', music);
	  url.searchParams.append('limited_time', limited_time);

      const generatedUrl = url.toString();

      generatedUrlElement.textContent = 'Generated URL: ' + generatedUrl;
    


	// Call the getData function, passing the generated URL
	getData(generatedUrl);
}


	function initialize() {
		
		// Map Styling
		var mapOptions = {
			center: new google.maps.LatLng(25.0368, 121.5133), 
			zoom: 14,
			maxZoom: 20,
			styles: COFFEEMAP,
			zoomControl: true,
			panContro: true,
			ScaleControl: true,
			ScaleControlOptions: {
				position: google.maps.ControlPosition.BOTTOM_RIGHT
			},
			mapTypeControl: true,
			mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
			position: google.maps.ControlPosition.TOP_LEFT
  },
			streetViewControl: true,
			  streetViewControlOptions: {
			position: google.maps.ControlPosition.TOP_LEFT //https://developers.google.com/maps/documentation/javascript/reference/control?hl=zh-tw#MapTypeControlOptions
  },
			panControlOptions: {
				position: google.maps.ControlPosition.BOTTOM_LEFT 
},
			zoomControlOptions: {
				style: google.maps.ScaleControlStyle.SMALL,
				position: google.maps.ControlPosition.LEFT_TOP
},

			

		};
		
		
		// Write the map into div=id map-canvas
		map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

		google.maps.event.addListener(map, 'dragend', function() {
			var bounds = map.getBounds();
			console.log("SW: " + bounds.getSouthWest() + " NE: " + bounds.getNorthEast());
			console.log("Center: " + map.getCenter().lat() + ", " +  map.getCenter().lng());
			getData(map.getCenter().lat(),map.getCenter().lng());
			//display the marker after dragging
			displayGeneratedUrl();
			setAllMap(map);
		
		});
		getData(map.getCenter().lat(),map.getCenter().lng());
		// Call the displayGeneratedUrl function when the page loads
		displayGeneratedUrl();
	}

	function getData(lat, lng){
		var lat = lat.toFixed(2); 
		var lng = lng.toFixed(3);

		// console.log("Getting Data: " + lat + ", " + lng );

		setAllMap(null);
		markerArray = [];
		//console.log(dataArray.length);



	}
		//  BackE: Edit this variable so that it points to our API Look at Cafe Database for the values you need
		// var url = "http://casa0017.cetools.org:8816/Table/Cafe";
	
	function getData(url) {
			setAllMap(null);
			markerArray = [];
	
		$.getJSON( url , function( data ) {
			
			//Create the markers with the loop
			$.each(data, function( k, v ) {
				
				var latLng = new google.maps.LatLng(parseFloat(v.latitude), parseFloat(v.longitude));

				dataArray.push(latLng);

				var marker = new google.maps.Marker({
					position: latLng, 
				   map: map,
				   icon: icon,	
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

				   var openTimeContent = marker.customInfo.open_time.trim() !== '' ? marker.customInfo.open_time : 'Information missing';

				   var urlContent = marker.customInfo.url.trim() !== '' ? `<a href="${marker.customInfo.url}" target="_blank">${marker.customInfo.url}</a>` : 'Information missing';

				   var content = `
					   <b>Name:</b> ${marker.customInfo.name}<br>
					   <b>City:</b> ${marker.customInfo.city}<br>
					   <b>Address:</b> ${marker.customInfo.address}<br>
					   <img src="img/icons/${wifiIcon}" width="25" height="25">
					   <img src="img/icons/${seatIcon}" width="25" height="25">
					   <img src="img/icons/${socketIcon}" width="25" height="25">
					   <img src="img/icons/${quietIcon}" width="25" height="25">
					   <img src="img/icons/${standingdeskIcon}" width="25" height="25">
					   <img src="img/icons/${cheapIcon}" width="25" height="25">
					   <img src="img/icons/${musicIcon}" width="25" height="25">  
					   <img src="img/icons/${limitedTimeIcon}" width="25" height="25">
					   <br>
					   <b>Open Time:</b> ${openTimeContent}<br>
					   <b>URL:</b> ${urlContent}
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

String.prototype.replaceAll = function(str1, str2, ignore) {
	return decodeURIComponent( this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2) );
} 
