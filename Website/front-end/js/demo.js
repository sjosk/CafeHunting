function demo() {
    // Avoid user clicking the button multiple times
    var button = document.getElementById('demoButton');
    button.disabled = true;
    //Set demo location (in Taipei)
    var MRT = { lat: 25.0418, lng: 121.5485 };
    map.setCenter(MRT);
    map.setZoom(17); 

    
    clearOverlays();

    // create location marker
    var marker = new google.maps.Marker({
        position: MRT,
        map: map,
        icon: user,
        title: 'MRT Station'
    });

    // Add markers to array
    markers.push(marker);

    // Mark the 500m radius around the location
    var circle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.3,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.05,
        map: map,
        center: MRT,
        radius: 500, 
        strokePattern: [5, 5] // the stroke style
    });

    // Add circles to array
    circles.push(circle);

    // reboot the button
    button.disabled = false;
}

// Clean the makers and circles on the map
function clearOverlays() {
    // clear all markers
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];

    // clear all circles
    for (var i = 0; i < circles.length; i++) {
        circles[i].setMap(null);
    }
    circles = [];
}


var markers = [];
var circles = [];

// Add event listener to the button
document.getElementById('demoButton').addEventListener('click', demo);
