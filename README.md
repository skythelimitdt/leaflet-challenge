# Global Earthquake & Tectonic Plate Visualization
🌍 **Explore the world's seismic activity and tectonic movements in real time!** <br> <br>
This project is an interactive map that visualizes global earthquake data and tectonic plate boundaries using **Leaflet.js**. It fetches real-time earthquake data from the **USGS Earthquake API** and tectonic plate boundary data from a **GitHub GeoJSON source**.


## Features
- Displays global earthquake data from the past 7 days.
- **Circle markers** represent earthquakes, with:
  - **Size** based on magnitude.
  - **Color** based on depth.
- **Tectonic plate boundaries** overlaid for reference.
- Base map options:
  - **Satellite View** (Esri)
  - **Grayscale View** (Carto)
  - **Outdoors View** (USGS)
- Interactive **layer controls** to toggle earthquakes and tectonic plates.
- **Popups** with earthquake details (magnitude, depth, location).
- **Legend** explaining color-coded depth representation.

## Data Sources
- **Earthquake Data:** [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson)
- **Tectonic Plates Data:** [GitHub - PB2002 Boundaries](https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json)

## Technologies Used
- **Leaflet.js** (for interactive mapping)
- **D3.js** (for fetching GeoJSON data)
- **HTML, CSS, JavaScript**

## Setup & Usage
1. Clone this repository: leaflet-challenge   
2. Open `index.html` in a browser.

or <br>
**explore earthquake data and tectonic plate boundaries here**: [View The Interactive Map](https://skythelimitdt.github.io/leaflet-challenge)


## License
This project is free to use for personal and academic purposes only. Commercial use is not permitted without prior authorization from the author.

## References
- Dataset for earthquakes created by [the United States Geological Survey](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
- Dataset for tectonic plates pulled from [GitHub - PB2002 Boundaries](https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json)
- ASU Data Analytics Bootcamp class activities
- chatGPT
-   Asked about legend's background optimization on bottom right
-   Fixed the code for earthquake data to show only when checked on the map overlay, otherwise remove the earthquake information

