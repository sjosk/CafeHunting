/* Searching from MRT*/
var markers = [];
var circles = [];
var circle; 
var button = document.getElementById('stationSelect'); 

//Link for datasearch.html
document.getElementById('stationSelect').addEventListener('change', function() {
    var url = this.value; 
    if (url==='datasearch.html') {
        window.location.href = url; 
    }
});

//Get lat lng from MRT and create marker and circle
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

