var circles = [];
var markers = [];
// Define Taipei city bounds
var TAIPEI_BOUNDS = {
    north: 25.210,
    south: 24.790,
    west: 121.456,
    east: 121.658
  };
  
  // Define Taipei city center
  var TAIPEI_CENTER = new google.maps.LatLng(25.0330, 121.5654);
  
  function locateUser() {
    if (isInfoWindowOpen) {
        return;
    }

      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
              var userLat = position.coords.latitude;
              var userLng = position.coords.longitude;
              var userPos = new google.maps.LatLng(userLat, userLng);
  
              if (userLat >= TAIPEI_BOUNDS.south && userLat <= TAIPEI_BOUNDS.north &&
                  userLng >= TAIPEI_BOUNDS.west && userLng <= TAIPEI_BOUNDS.east) {
                  // If user is in the area of Taipei, set user's location as center and add a marker
                  map.setCenter(userPos);
                  map.setZoom(17);
                  clearOverlays();
                  new google.maps.Marker({
                      position: userPos,
                      map: map,
                      title: 'Here you are!'
                  });
                   
                    markers.push(marker);
                  var circle = new google.maps.Circle({
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.1,
                    map: map,
                    icon: user,
                    center: userPos,
                    radius: 500, 
                    strokePattern: [5, 5]
                });
                  circles.push(circle);

                    // reboot the button
                    button.disabled = false;

              } else {
                  // If user is outside of Taipei, show an info window with a message
                  // Move the map center to Taipei city center
                  map.setCenter(TAIPEI_CENTER);
                  map.setZoom(17);
                  var infoWindow = new google.maps.InfoWindow({
                      content: ' 🚧 No database in your area.'+'('+userLat+','+userLng+')'+'</br>'+' We only provide cafe information in Taipei City.',
                      position: TAIPEI_CENTER // show the message in the center of Taipei
                  });
                  isInfoWindowOpen = true;//update the marker when infowindow is open
                  infoWindow.open(map);
              }
             

              google.maps.event.addListener(infoWindow, 'closeclick', function() {
                isInfoWindowOpen = false; // update the marker when infowindow is closed
            });

          }, function(error) {
              // Error handling
              handleLocationError(true, TAIPEI_CENTER);
          });
      } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, TAIPEI_CENTER);
      }
  }
  
  function handleLocationError(browserHasGeolocation, pos) {
      var contentString = browserHasGeolocation ?
          'Error: The Geolocation service failed.' :
          'Error: Your browser doesn\'t support geolocation.';
      var infoWindow = new google.maps.InfoWindow({ map: map, position: pos, content: contentString });
      infoWindow.open(map);
  }
  
  // Button click listener
  document.getElementById('locateButton').addEventListener('click', locateUser);
  
