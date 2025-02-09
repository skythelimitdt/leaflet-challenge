// Create the 'basemap' tile layer that will be the background of our map.
let basemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; <a href="https://www.esri.com/">satellite</a>',
    maxZoom: 20
});

// Create the 'street' tile layer as a second background of the map.
let street = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; <a href="https://www.usgs.gov/">outdoors</a>',
    maxZoom: 16
});

// Create the 'grayscale' tile layer as a third background of the map.
let grayscale = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">grayscale</a>',
    subdomains: 'abcd',
    maxZoom: 20
});

// Create the 'baseMaps' object with the 3 map views.
let baseMaps = {
    Satellite: basemap,
    Grayscale: grayscale,
    Outdoors: street     
};

// Create the default map object with center and zoom options.
let myMap = L.map("map", {
    center: [20, 0],
    zoom: 2,
    layers: [basemap] // Default layer
});


// Layer groups for overlays
let earthquakeLayer = L.layerGroup();
let tectonicPlates = L.layerGroup();

// Make a request to retrieve the earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.geometry.coordinates[2]), // Depth is the third coordinate
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }

    function getColor(depth) {
        return depth > 90 ? "#ff0000" :
               depth > 70 ? "#ff6600" :
               depth > 50 ? "#ff9900" :
               depth > 30 ? "#ffcc00" :
               depth > 10 ? "#ffff00" :
                            "#00ff00";
    }

    function getRadius(magnitude) {
        return magnitude === 0 ? 1 : magnitude * 2;
    }

    // Add a GeoJSON layer to the map once the file is loaded.
    earthquakeLayer = L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                `<strong>Location:</strong> ${feature.properties.place}<br>
                 <strong>Magnitude:</strong> ${feature.properties.mag}<br>
                 <strong>Depth:</strong> ${feature.geometry.coordinates[2]} km`
            );
        }
    }).addTo(myMap);  // <-- Add to earthquakeLayer instead of map

    // Create a legend control object.
    let legend = L.control({ position: "bottomright" });

    legend.onAdd = function () {
        let div = L.DomUtil.create("div", "info legend");
        div.style.backgroundColor = "white";
        div.style.padding = "10px";
        div.style.borderRadius = "5px"; // For rounded corners
        div.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)"; // For a subtle shadow effect
        // Adding a title
        div.innerHTML = "<h4 style='margin: 0 0 5px; text-align: center;'>Depth (km)</h4>";
        let depths = [-10, 10, 30, 50, 70, 90];
        let colors = ["#00ff00", "#ffff00", "#ffcc00", "#ff9900", "#ff6600", "#ff0000"];

        for (let i = 0; i < depths.length; i++) {
            div.innerHTML +=
                `<div style="display: flex; align-items: center;">
                    <i style="background: ${colors[i]}; width: 15px; height: 15px; display: block;"></i> 
                    <span style="margin-left: 5px;">${depths[i]}${depths[i + 1] ? " – " + depths[i + 1] : " +"}</span>
                </div>`;
        }
        return div;
    };

    legend.addTo(myMap);


// Make a request to get our Tectonic Plate geoJSON data.
    d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (plate_data) {
        tectonicPlates = L.geoJson(plate_data, {
         color: "orange",
         weight: 2
        }).addTo(myMap);

        // Add the layer control with overlays
        let overlays = {
         "Earthquakes": earthquakeLayer,
         "Tectonic Plates": tectonicPlates
        };
        L.control.layers(baseMaps, overlays, {
            collapsed: false
        }).addTo(myMap);
    });
});