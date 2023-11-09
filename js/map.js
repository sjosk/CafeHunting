
    var map;
	var markerArray = [];
	var dataArray = [];
	var latlngArray = [];
	var infowindow = new google.maps.InfoWindow({maxWidth: 300});
	var icon = {
    url: './img/cafe.png',
    scaledSize: new google.maps.Size(18, 18),
	}
	
	$(document).ready(function() {

		function initialize() {
			
			// Map Styling
			var mapOptions = {
				center: new google.maps.LatLng(25.0330, 121.5654), 
				zoom: 13,
				maxZoom: 20,
				styles: greenMap,
				zoomControl     : true,
				panControl      : true,
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
					style   : google.maps.ScaleControlStyle.SMALL,
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
				setAllMap(map);
			
			});
			getData(map.getCenter().lat(),map.getCenter().lng());
			
		}

		function getData(lat, lng){
			var lat = lat.toFixed(2); 
			var lng = lng.toFixed(3);

			// console.log("Getting Data: " + lat + ", " + lng );

			setAllMap(null);
			markerArray = [];
			//console.log(dataArray.length);

			//  BackE: Edit this variable so that it points to our API Look at Cafe Database for the values you need
			var url = "http://casa0017.cetools.org:8816/Table/Cafe";

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
				
						var content = `
							<b>Name:</b> ${marker.customInfo.name}<br>
							<b>City:</b> ${marker.customInfo.city}<br>
							<b>Address:</b> ${marker.customInfo.address}<br>
							<b>Wifi:</b> ${marker.customInfo.wifi}<br>
							<b>Seat:</b> ${marker.customInfo.seat}<br>
							<b>Quiet:</b> ${marker.customInfo.quiet}<br>
							<b>Cheap:</b> ${marker.customInfo.cheap}<br>
							<b>Music:</b> ${marker.customInfo.music}<br>
							<b>Limited time:</b> ${marker.customInfo.limited_time}<br>
							<b>Socket:</b> ${marker.customInfo.socket}<br>
							<b>Standing desk:</b> ${marker.customInfo.standing_desk}<br>
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

	String.prototype.replaceAll = function(str1, str2, ignore) {
    	return decodeURIComponent( this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2) );
	} 
 

