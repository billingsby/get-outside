//  Global Variables

var map;
var radius;
var activity = "hiking";
var latitude;
var longitude;
var trails='';



// Find initial location and load map
function initialize(location) {
  latitude = 39.833;
  longitude = -98.583﻿;
  map = L.map('map').setView([latitude, longitude], 4);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'billingsby.p8gk9ma9',
    accessToken: 'pk.eyJ1IjoiYmlsbGluZ3NieSIsImEiOiJjaWwybmpzZHEzZzZ5dW1rczR1NnQzOWVyIn0.kI9i7wGvEUIUOuKzZiGRDg'
}).addTo(map);


}
var geoCode = function(inputAddress) {
  var geocoder = new google.maps.Geocoder();
  var geocoderRequest = { 
    address: inputAddress 
  };
  geocoder.geocode(geocoderRequest, function(results, status){
    latitude = results[0].geometry.location.lat();
    longitude = results[0].geometry.location.lng();
    console.log(latitude);
    console.log(longitude);
    map.panTo(new L.LatLng(latitude, longitude));
    map.zoomIn(6);
    getTrails(latitude, longitude);
  });
  
};


// Get activity selected
 function activity() {
  if ($('#hike').click('clicked')) {
    activity = "hiking";
  } else if 
    ($('#bike').click('clicked')) {
      activity = "mountain biking";
    }
  };

// Trails request
var getTrails = function(latitude, longitude) {
var params = {
  'q[activities_activity_type_name_eq]': activity,
  lat: latitude,
  lon: longitude,
  radius: radius
}
console.log(params);
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
  console.log(result.places);
  $.each(result.places, function(i, places) {
    var lat = places.lat;
    var lon = places.lon;
   
     var marker = new L.marker([lat, lon]).addTo(map);
  });
    
    
  })
};



  
  // Slider Functions
var mySlider = $('#radius').slider();

// Call a method on the slider
var radius = mySlider.slider('getValue');

$('.controls').on('slide', mySlider, function() {
  radius = mySlider.slider('getValue');
  $('#radius-num').text(radius);
});
  



$(document).ready(function() {
  initialize();
  // navigator.geolocation.getCurrentPosition(initialize);
  $('.controls').on('click', '#find-trails', function(e) {
    e.preventDefault();
    var inputAddress = $('#address').val();
    geoCode(inputAddress);
  });
  

  
}());