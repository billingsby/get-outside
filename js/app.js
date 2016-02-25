//  Global Variables

var map;
var radius;

// Find initial location and load map
function initialize(location) {
  var userLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
  var mapOptions = { 
    zoom:8, 
    mapTypeId: google.maps.MapTypeId.ROADMAP, 
    center: userLocation 
  };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $.ajax({
               type: "GET",
               url: "gpx/my_route.gpx",
               dataType: "xml",
               success: function (xml) {
                    var points = [];
                    var bounds = new google.maps.LatLngBounds();
                    $(xml).find("trkpt").each(function () {
                         var lat = $(this).attr("lat");
                         var lon = $(this).attr("lon");
                         var p = new google.maps.LatLng(lat, lon);
                         points.push(p);
                         bounds.extend(p);
                    });
                    var poly = new google.maps.Polyline({
                         // use your own style here
                         path: points,
                         strokeColor: "#FF00AA",
                         strokeOpacity: .7,
                         strokeWeight: 4
                    });
                    poly.setMap(map);
                    // fit bounds to track
                    map.fitBounds(bounds);
               }
          });
}

  // Slider Functions
var mySlider = $('#radius').slider();

// Call a method on the slider
var value = mySlider.slider('getValue');
console.log(value);
$('.controls').on('slide', mySlider, function() {
  value = mySlider.slider('getValue');
  $('#radius-num').text(value);
});
  



$(document).ready(function() {

  navigator.geolocation.getCurrentPosition(initialize);

  
}());