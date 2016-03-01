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


var starWidth = function(rating) {
  console.log(rating);
  var result = Math.round((rating/5)*100);
  return result;
};

// Create popup content
var showInfo = function(places) {
  
  var trail = '<div class="popup"><div id="title"><h3>' + places.name + '</h3></div>';
  var thumb = '<div id="thumb"><img id="thumbnail" src="' + places.activities[0].thumbnail + '"></div>';
  var distance = '<div id="stats"><ul class="list-unstyled list-inline"><li id="distance"><h5>' + places.activities[0].length + ' Miles</h5></li>';
  var rating = starWidth(places.activities[0].rating);
  var stars = '<li><div class="rating_bar"><div  class="rating" style="width:' + rating + ';"></div></div></li>';
  var description = '<div id="description"><h4>Description</h4><p id="trail-description">' + places.activities[0].description + '</p></div></div>';
  
  if (places.activities[0].thumbnail == null) { 
    var result = trail + distance + stars + description;
   } else {
    var result = trail + thumb + distance + stars + description;
  }
  return result;

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
  
  $.each(result.places, function(i, places) {
    var lat = places.lat;
    var lon = places.lon;
    var info = showInfo(places);
    
     var marker = new L.marker([lat, lon]).addTo(map);
   
     marker.bindPopup(info, {
        closeButton: false,
        minWidth: 320
      });
     
    });
  });
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
  // Build Map
  initialize();
  
  // Get activity selected
 $('controls').on('click', '#bike #hike', function () {
    if($(this).hasClass('active')){
        $(this).removeClass('active')
    } else {
        $(this).addClass('active')
    }
  

    if ($('#hike').hasClass('active')) {
          activity = "hiking";
      } else if 
        ($('#bike').hasClass('active')) {
          activity = "mountain biking";
      }
    });

  // Get Trails
  $('.controls').on('click', '#find-trails', function(e) {
    e.preventDefault();
    var inputAddress = $('#address').val();
    geoCode(inputAddress);
  });
  

  
}());