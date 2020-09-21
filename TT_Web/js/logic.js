// //The map will display in a different location based on the state selected:
// //Selecting the value of the dropdown Menu:
// var state = dropdownMenu.property("value");

// //Create a conditional statement based on the sate selected:
// if (state == "VIC") {
//   var myMap = L.map("map", {
//     center: [-37.81, 144.96],
//     zoom: 7
//   })
// }
// else if (state == "NSW") {
//   var myMap = L.map("map", {
//     center: [-33.86, 151.20],
//     zoom: 7
//   })
// }
// else if (state == "ACT") {
//   var myMap = L.map("map", {
//     center: [-35.28, 149.13],
//     zoom: 7
//   })
// }
// else if (state == "QLD") {
//   var myMap = L.map("map", {
//   center: [-23.52, 148.16],
//   zoom: 6
//   })
// }
// else if (state == "SA") {
//   var myMap = L.map("map", {
//   center: [-34.92, 138.60],
//   zoom: 7
//   })
// }
// else if (state == "WA") {
//   var myMap = L.map("map", {
//   center: [-31.95, 115.86],
//   zoom: 7
//   })
// }
// else if (state == "NT") {
//   var myMap = L.map("map", {
//   center: [-18, 134.19],
//   zoom: 6
//   })
// }
// else if (state == "All") {
//   var myMap = L.map("map", {
//   center: [-25.69, 133.88],
//   zoom: 5
//   })
// }


// Creating map object
var myMap = L.map("map", {
  center: [-25.69, 133.88],
  zoom: 5
});


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
  tileSize: 300,
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

// // Store API query variables
// var baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
// var date = "$where=created_date between'2016-01-01T00:00:00' and '2017-01-01T00:00:00'";
// var complaint = "&complaint_type=Rodent";
// var limit = "&$limit=10000";

// // Assemble API query URL
// var url = baseURL + date + complaint + limit;

// Grab the data with d3
d3.json("jobSearchResults.json").then(function (response) {

  // Create a new marker cluster group
  var markers = L.markerClusterGroup({
    spiderfyOnMaxZoom: false,
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

  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var latitude = response[i].latitude;
    var longitude = response[i].longitude;

    // Check for location property
    if (latitude) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([latitude, longitude])
        .bindPopup("<h1>" + response[i].title + "</h1> <hr> <h3>Company: " + response[i].company + "</h3>"
          + "<p><a href=" + response[i].redirect_url + ">Position description</a></p>" +
          "<p>Date posted: " + new Date(response[i].created) + "</p>"));
    }

  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});

// var markerCluster = new MarkerClusterer(map, markers, { 
//   imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
//   zoomOnClick: false
// });
// markerCluster.addListener('clusterclick', function(cluster){
//   if (markers.length > 5){ // change #5 if you need to test different scenarions
//         infowindow.setPosition(cluster.getCenter());
//         infowindow.setContent("Simple Test");
//         infowindow.open(map);

//         }
//   else {
//           markerCluster.zoomOnClick = true;
//           map.fitBounds(cluster.getBounds());

//              } 
//   });


