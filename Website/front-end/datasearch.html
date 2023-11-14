/* Datasearch.html */
// The first method we have tried to link the database

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cafe Hunting - Search</title>
    <link rel="icon" href="./img/weblogo-05.png" type="image/png">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/list.js/1.5.0/list.min.js"></script>
    <link rel='stylesheet' href='./css/d.css' type='text/css'/>

    <script type='text/javascript' src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type='text/javascript' src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
    <script src='https://maps.googleapis.com/maps/api/js?libraries=visualization&key=YOUR_API_HERE'></script> 
    <script type='text/javascript' src='./js/mapStyle.js'></script>
    <script type='text/javascript' src='./js/dar.js'></script>
    
</head>
<body>
    <div id='wrapper'>
        <!-- left -->
        <div id='user-panel'>
            <a href="index.html"><img id="Icon" src="./img/logo.png" alt="Cafe Hunting logo" width="360px" /></a><br>
            <div id="SearchSection">
            <input type="text" id="searchInput" placeholder="🔍&nbsp;&nbsp;&nbsp;Enter Cafe Name">
            <button id="hunt" onclick="search()">Hunt</button>
            <div id="dashline"></div>
            <table id="resultsTable">
                <thead>
                    <tr>
                       
                        
                    </tr>
                </thead>
                <tbody id="results">
                    <!-- 搜索结果 -->
                </tbody>
            </table>
            <div id="dashline"></div>
            <a href="index.html" alt="Back to Homepage"><img id="slogan" src="./img/slogan-03.png" alt="Cafe Hunting slogan" width="350px" /></a><br>
            </div>
        
            <div id="pagination"></div>
            <div id="generatedUrl"></div>
        </div>
        
        <!-- Right -->
        <div id='map-canvas'> 
        <!-- Map here -->
        </div>
    </div>
  
    <script type="text/javascript">
        var map;
        var markerArray = [];
        var dataArray = [];
        var latlngArray = [];
        var infowindow = new google.maps.InfoWindow({maxWidth: 300});
        var icon = {
        url: './img/icon2.png',
        
        scaledSize: new google.maps.Size(18, 18),
        }
        
        $(document).ready(function() {
    
            function initialize() {
                var mapOptions = {
                    center: new google.maps.LatLng(51.514756, -0.104345),
                    zoom: 15,
                    maxZoom: 18,
                    styles: COFFEEMAP,
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
               
                var url = "http://dev.spatialdatacapture.org:8870/data/"+lat+"/"+lng+"/350";
    
                $.getJSON( url , function( data ) {
                    
                    //console.log(data);
                
                    
                    $.each(data, function( i, v ) {
                        
                        var latLng = new google.maps.LatLng(v.lat, v.lon);
                        var marker = new google.maps.Marker({
                             position: latLng, 
                             customInfo: v.pid,
                            icon: icon,
                            map: map,
                         });
                        markerArray.push(marker);
    
     });
    
                      setAllMap(map);
                });
            }
    
            google.maps.event.addDomListener(window, 'load', initialize);

    
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
         
    </script>
    
</body>
</html>
