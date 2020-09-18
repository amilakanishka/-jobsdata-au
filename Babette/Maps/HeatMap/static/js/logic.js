// Creating map object
var myMap = L.map("map", {
  center: [-25.69, 133.88],
  zoom: 5
});

// Adding tile layer to the map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
}).addTo(myMap);



// // // Store API query variables
// // var baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
// // var date = "$where=created_date between'2016-01-01T00:00:00' and '2017-01-01T00:00:00'";
// // var complaint = "&complaint_type=Rodent";
// // var limit = "&$limit=10000";

// // // Assemble API query URL
// // var url = baseURL + date + complaint + limit;

// Grab the data with d3
d3.json("jobSearchResults.json", function (response) {

  var heatArray = [];

  for (var i = 0; i < response.length; i++) {
    var latitude = response[i].latitude;
    var longitude = response[i].longitude;

    if (latitude) {
      heatArray.push([latitude, longitude]);
    }
  }

  var heat = L.heatLayer(heatArray, {
    radius: 50,
    blur: 35
  }).addTo(myMap);

  // // Create a new marker cluster group
  // var markers = L.markerClusterGroup();

  // // Loop through data
  // for (var i = 0; i < response.length; i++) {

  //   // Set the data location property to a variable
  //   var latitude = response[i].latitude;
  //   var longitude = response[i].longitude;

  //   // Check for location property
  //   if (latitude) {

  //     // Add a new marker to the cluster group and bind a pop-up
  //     markers.addLayer(L.marker([latitude, longitude])
  //       .bindPopup("<h1>" + response[i].title + "</h1> <hr> <h3>Company: " + response[i].company + "</h3>"
  //         + "<p><a href=" + response[i].redirect_url + ">Position description</a></p>" +
  //         "<p>Date posted: " + new Date(response[i].created) + "</p>"));
  //   }

  // }

  // // Add our marker cluster layer to the map
  // myMap.addLayer(markers);

});
