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
//Grab the data with d3
d3.json(baseURL, function(data){
    console.log(data);

    for (var i=0; i < data.features.length; i++){

        L.circle(data.features[i].geometry.coordinates.reverse().slice(1), {
            fillOpacity:0.75,
            color: 'white',
            fillColor:getColor(data.features[i].properties.mag),
            radius:markerSize(data.features[i].properties.mag)
        }).bindPopup("<h1>" + data.features[i].properties.place + "</h1><hr><h3>Magnitude: "+data.features[i].properties.mag + "</h3> </h3>Time:" + new Date(data.features[i].properties.time)+ "</h3>")
        .addTo(myMap);
    }
});

var legend=L.control({position:'bottomright'});

legend.onAdd=function(map){

    var div=L.DomUtil.create('div', 'info legend'),
        grades=[0,1,2,3,4,5],
        labels=[];

        for (var i=0; i<grades.length; i++){
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i]+1)+ '"></i>'+
                grades[i]+(grades[i+1]?'&ndash;' +grades[i+1] + '<br>' : '+'); 
        }

        return div;
};

legend.addTo(myMap);