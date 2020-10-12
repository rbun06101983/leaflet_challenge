//Creating map object
var myMap=L.map('map',{
    center:[39.50,-98.35],
    zoom:2.25
});

//Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize:512,
    maxZoom:5,
    zoomOffset:-1,
    id:"mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

// Store API query variables
var baseURL='https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'

//Grab the data with d3
d3.json(baseURL).then(function(data){
    console.log(data);
})