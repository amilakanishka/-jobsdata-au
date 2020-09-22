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

d3.select("#submit").on("click", handleSubmit);
var myMap = null;

function handleSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  var stateSelection = d3.select("#ddstate").node().value;
  console.log(stateSelection);
  var roleSelection = d3.select("#ddrole").node().value;
  console.log(roleSelection);
  var url = `/get_jobs/${stateSelection}/${roleSelection}`;
  d3.json(url).then(function(data) {
    console.log(data);
    renderMap(data,stateSelection);
    renderWordCloud(data);
  });
}

function renderMap(data,state){
    if (myMap !== undefined && myMap !== null) {
      myMap.remove(); // should remove the map from UI and clean the inner children of DOM element
    }

    // var state = ["Australian Capital Territory", "Victoria", "New South Wales", "Queensland", "Western Australia",
    //   "South Australia", "Northern Territory", "All"]
    // var latitude = [-35.28, -37.81, -33.86, -23.52, -31.95, -34.92, -18, -25.69];
    // var longitude = [149.13, 144.96, 151.20, 149.13, 115.86, 138.60, 134.19, 133.88];
    // var zoom = [7, 7, 7, 6, 7, 7, 6, 5];

    // //Create a conditional statement based on the sate selected:
    // if (state == state) {
    //   var myMap = L.map("map", {
    //     center: [latitude, longitude],
    //     zoom: zoom
    //   });
    // }

  myMap = L.map("map", {
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
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
    }).addTo(myMap);

    // Only one base layer can be shown at a time
    var baseMaps = {
    Light: lightmap,
    };

    // Pass our map layers into our layer control
    // Add the layer control to the map
    L.control.layers(baseMaps).addTo(myMap);


    // Grab the data with d3
    //d3.json("jobSearchResults.json", function (response) {
    var response = data;
    // Create a new marker cluster group
    Street: streetmap
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
        var latitude = parseFloat(response[i].latitude);
        var longitude = parseFloat(response[i].longitude);

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
}

function renderWordCloud(data){
  var jobListing = data
  var keywords = [];
  var titles = [];
  var areas = [];

  for (var i = 0; i < jobListing.length; i++) {
      keywords.push(jobListing[i].keyword) // Return keyword in a list
      titles.push(jobListing[i].title) // Return title in a list
      areas.push(jobListing[i].area) // Return area in a list
  };

  // Get unique values for titles - NOT USED - DELETE LATER
  // var distinctTitles = [...new Set(titles)];
  // console.log(distinctTitles);  

  // Split words in title
  // Use RegEx to replace special characters with space 
  var splitTitles = [];

  for (var i = 0; i < titles.length; i++) {
      var temp = titles[i].replace(/[&\/\\#,+()$~%.'":*?<>{}[_-]|[\0\d]/g," ")
                          .split(" ");
      splitTitles = splitTitles.concat(temp);
  }

  // Count by unique
  var counts = {};

  for (var i = 0; i < splitTitles.length; i++) {
      counts[splitTitles[i]] = 1 + (counts[splitTitles[i]] || 0);
  }

  // Set the data
  var wordData = [];
  
  for (var item in counts) {
      wordData.push({ x: item, 
                  value: counts[item]
              });
  }

  // Remove dictionary if key is - | ] or blank. Clean up balance after RegEx
  var wordData = wordData.filter(item =>
      (item.x !== "|") &&
      (item.x !== "") &&
      (item.x !== "-") &&
      (item.x !== "]"));

  // Sort the list of dictionaries by value
  wordData.sort(function(first, second) {
      return second.value - first.value;
  })

  // Limit to top 35 words
  var topWords = [];

  for (var i = 0; i < 35; i++) {
      topWords.push(wordData[i]);
  }


  // Render word cloud chart
  anychart.onDocumentReady(function() {

      var data = topWords;
      var chart = anychart.tagCloud(data);

      // Create and configure a color scale
      var customColorScale = anychart.scales.linearColor();
      customColorScale.colors(["#246ED1", "#23B5B5"]);

      // Bind customColorScale to the color scale of the chart
      chart.colorScale(customColorScale);

      // Add a color range
      chart.colorRange().enabled(true);

      // Set word angle to straight
      chart.angles([0]);

      // Set the chart title
      chart.title("Most Popular Words Used in Position Titles");

      // Configure the visual settings of the chart
      chart.hovered().fill("#FF5757");
      chart.hovered().fontWeight(800);
      
      // Set the container id
      chart.container("cloud");

      // Initiate drawing the chart
      chart.draw();
  })    
}

window.onload=function(){
}


//});

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


