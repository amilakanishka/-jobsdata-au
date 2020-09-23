function renderMap(data,state){
    if (myMap !== undefined && myMap !== null) {
      myMap.remove(); // should remove the map from UI and clean the inner children of DOM element
    }
    var stateLocations = {
                          "Australian Capital Territory": [-35.28, 149.13, 7], 
                          "Victoria"                    : [-37.81, 144.96, 7], 
                          "New South Wales"             : [-33.86, 151.20, 7], 
                          "Queensland"                  : [-23.52, 149.13, 6], 
                          "Western Australia"           : [-31.95, 115.86, 7], 
                          "South Australia"             : [-34.93, 138.60, 7], 
                          "Northern Territory"          : [-35.28, 149.13, 6], 
                          "Australian Capital Territory": [-25.69, 133.88, 5],
                          "All"                         : [-25.27, 133.77, 4] 
                        };
    console.log(stateLocations);     
    for (const [key, value] of Object.entries(stateLocations)) {      
      if(key == state){
        myMap = L.map("map", {
          center: [value[0], value[1]],
          zoom: value[2]
          });        
      }
    }              
    // // Adding light tile layer to the map
    // var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    // attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    // maxZoom: 18,
    // id: "light-v10",
    // accessToken: API_KEY
    // }).addTo(myMap);
    // Adding street tile layer to the map
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
    }).addTo(myMap);
    // // Only one base layer can be shown at a time
    // var baseMaps = {
    // Light: lightmap,
    // };
    // // Pass our map layers into our layer control
    // // Add the layer control to the map
    // L.control.layers(baseMaps).addTo(myMap);
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
            .bindPopup("<h3>" + response[i].title + "</h3> <hr> <h4>Company: " + response[i].company + "</h4>"
            + "<p><a href=" + response[i].redirect_url + ">Position description</a></p>" +
            "<p>Date posted: " + new Date(response[i].created) + "</p>"));
        }
    }
    // Add our marker cluster layer to the map
    myMap.addLayer(markers);
}