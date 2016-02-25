//  Global Variables

var map;
var radius;
var activity = "hiking";
var inputAddress;
var latitude;
var longitude;


// Find initial location and load map
function initialize(location) {
  inputAddress = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
  latitude = inputAddress.lat();
  console.log(inputAddress);
  console.log(latitude);
  longitude = inputAddress.lng();
  
  var mapOptions = { 
    zoom:8, 
    mapTypeId: google.maps.MapTypeId.TERRAIN, 
    center: inputAddress 
  };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    
}
// Get activity selected
 function activity() {
  if ($('#hike').click('clicked')) {
    activity = "hiking";
  } else if 
    ($('#bike').click('clicked')) {
      activity = "mountain biking";
    }
  };

// EveryTrail request
var getTrails = function() {
var params = {
  'q[activities_activity_type_name_eq]': activity,
  // lat: latitude,
  // lon: longitude,
  'q[city_cont]': 'Denver',
  'q[state_cont]': 'Colorado',
  radius: radius
}
function setHeader(xhr) {
  xhr.setRequestHeader('X-Mashape-Key', '4YanT409HXmshDOtn4QkTe1DNY33p1EVI2VjsnSlO6ccfOgjRd');
  xhr.setRequestHeader('Accept', 'text/plain');
}

$.ajax({
    url: "https://trailapi-trailapi.p.mashape.com/",
    beforeSend: setHeader,
    data: params,
    type: "GET",
  })
.done(function(result){ 
    console.log(result);
    
    $.each(result.places, function(i, item) {
      var markerPosition = {lat:item.lat , lng:item.lon};
      console.log(markerPosition);
       var marker = new google.maps.Marker({
      position: markerPosition,
      map: map,
      title: 'Hello World!'
  });

      
    });
  })
  // .fail(function(jqXHR, error){ //this waits for the ajax to return with an error promise object
  //   var errorElem = showError(error);
  //   $('.search-results').append(errorElem);
  // });
};

  
  // Slider Functions
var mySlider = $('#radius').slider();

// Call a method on the slider
var radius = mySlider.slider('getValue');
console.log(radius);
$('.controls').on('slide', mySlider, function() {
  radius = mySlider.slider('getValue');
  $('#radius-num').text(radius);
});
  



$(document).ready(function() {

  navigator.geolocation.getCurrentPosition(initialize);
  getTrails();

  
}());