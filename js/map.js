
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
				center: new google.maps.LatLng(51.514756, -0.104345), // London->need to change
				zoom: 17,
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
			var url = "http://dev.spatialdatacapture.org:8870/data/"+lat+"/"+lng+"/350";

			$.getJSON( url , function( data ) {
				
                //Create the markers with the loop
				$.each(data, function( i, v ) {
					
					var latLng = new google.maps.LatLng(v.lat, v.lon);
					var marker = new google.maps.Marker({
		     			position: latLng, 
		     			customInfo: v.pid,
						icon: icon,
						map: map,
		     		});
					markerArray.push(marker);


                            //Using Flickr API to get the photo as an example(waiting for our database)
							google.maps.event.addListener(marker, 'click', function(content) {
								return function(content){
									infowindow.setContent("");
									
									map.setCenter(new google.maps.LatLng(v.points.y, v.points.x));
									$.getJSON("http://dev.spatialdatacapture.org:8870/data/photoDescription/"+this.customInfo, function( data ) {
										var dateTaken = new XDate((data[0].date_uploaded * 1000)).toString("MMM d, yyyy HH:mm:ss");
										var content = "<b>Photo ID: </b>"+v.pid+"<br/> <br/><b>Description:</b><br/> "+data[0].description.replaceAll("+", " ")+" <br/> <br/><b>Date Taken: </b> "+dateTaken+" <br/><b>Camera: </b> "+data[0].device.replaceAll("+", " ")+"<br/><b>Location:</b> "+ v.points.y + ", " + v.points.x +" <br/><br/> <b>Photo</b> <br/><br/> <img src='"+data[0].download_url+"' width='300px' alt='Description'>";
								    	infowindow.setContent(content);
								    });
					
								    infowindow.open(map,this);
								}
							}(""));

						
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
 

