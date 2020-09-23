// //The map will display in the centre of each state based on the state the user selected:
//Selecting the value of the dropdown Menu:

var dropdownMenu = d3.select("select").name("state");
var state = dropdownMenu.property("value");

var state = ["Australian Capital Territory", "Victoria", "New South Wales", "Queensland", "Western Australia",
  "South Australia", "Northern Territory", "All"]
var latitude = [-35.28, -37.81, -33.86, -23.52, -31.95, -34.92, -18, -25.69];
var longitude = [149.13, 144.96, 151.20, 149.13, 115.86, 138.60, 134.19, 133.88];
var zoom = [7, 7, 7, 6, 7, 7, 6, 5];

//Create a conditional statement based on the sate selected:
if (state == state) {
  var myMap = L.map("map", {
    center: [latitude, longitude],
    zoom: zoom
  });
}

//To initialise the map on local machine
// var myMap = L.map("map", {
//       center: [-25, 134],
//       zoom: 5
//     });


// Adding light tile layer to the map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
}).addTo(myMap);


// Adding street tile layer to the map
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Only one base layer can be shown at a time
var baseMaps = {
  Light: lightmap,
  Street: streetmap
};

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps).addTo(myMap);

// Grab the data with d3 (TO BE CHANGED FOR THE APP)
d3.json("jobSearchResults.json").then(function (response) {

  // Create a new marker cluster group
  var markers = L.markerClusterGroup({
    //spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    // zoomToBoundsOnClick: false,
    iconCreateFunction: function (cluster) {
      var childCount = cluster.getChildCount();
      var c = ' marker-cluster-';
      if (childCount < 10) {
        c += 'small';
      }
      else if (childCount < 100) {
        c += 'medium';
      }
      else {
        c += 'large';
      }

      return new L.DivIcon({
        html: '<div><span>' + childCount + '</span></div>',
        className: 'marker-cluster' + c, iconSize: new L.Point(40, 40)
      });
    }

  });

  // Loop through the data 
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var latitude = response[i].latitude;
    var longitude = response[i].longitude;

    // Check for location property
    if (latitude) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([latitude, longitude])
        .bindPopup("<h2>" + response[i].title + "</h2> <hr> <h3>" + response[i].company + "</h3>"
          + "<p><a href=" + response[i].redirect_url + ">Position description</a></p>" +
          "<p>Date posted: " + new Date(response[i].created) + "</p>"));
    }

  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});


