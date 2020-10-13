var queryURL='https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'

var faultURL='https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json'

    function markerSize(mags){
        return mags*40000;
    }

    function getColor(d){
        return d>5?'#FF4500':
               d>4?'#FF8C00':
               d>3?'#FFF00':
               d>2?'#9ACD32':
               d>1?'#556B2F':
               d>0?'#00FF00':
                    '#00FFFF';
    }
//create an array for the markers
var faultlineMarkers=[]
var earthquakeMarkers=[]
//Perform a GET request
d3.json(queryURL, (data)=>{
    d3.json(faultURL, (fData)=>{
        for (var i=0; i < data.features.length; i++){
            earthquakeMarkers.push(
                L.circle(data.features[i].geometry.coordinates.reverse().slice(1), {
                    fillOpacity:0.75,
                    color: getColor(data.features[i].properties.mag),
                    fillColor:getColor(data.features[i].properties.mag),
                    radius:markerSize(data.features[i].properties.mag)
                }).bindPopup("<h1>" + data.features[i].properties.place + "</h1><hr><h3>Magnitude: "+data.features[i].properties.mag + "</h3> </h3>Time:" + new Date(data.features[i].properties.time)+ "</h3>")
                );
            }
        
        for (var k=0; k< fData.features.length; k++){
            faultlineMarkers.push(
                L.polyline(fdata.features[k].geometry.coordinates, {color:'#FF8C00'})
                );
            console.log(fdata.features[k].geometry);
            }
    })    
})

//Add the cityMarkers to a new layer group
var earthquakeLayer=L.layerGroup(earthquakeMarkers);
var faultlineLayer=L.layerGroup(faultlineMarkers);

//Define variables for our tile layers
var satellite=L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize:512,
    maxZoom:5,
    zoomOffset:-1,
    id:"mapbox/streets-v11",
    accessToken: API_KEY
