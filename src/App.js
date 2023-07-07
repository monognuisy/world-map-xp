import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import geoJson from 'world-geojson';

mapboxgl.accessToken =
  'pk.eyJ1IjoibW9ub2dudWlzeSIsImEiOiJjbGpyM3NtNW4wY2JzM2JuZ2U0NGl6N2xkIn0._f_HHkotdV3pQUahw0kUBg';

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });

    const currMap = map?.current;
  
    currMap.on('load', () => {
      // Add a source for the state polygons.
      currMap.addSource('U.S.A.', {
        type: 'geojson',
        data: geoJson.forCountry('U.S.A.'),
      });
      currMap.addSource('Canada', {
        type: 'geojson',
        data: geoJson.forCountry('south_korea'),
      });
  
      // Add a layer showing the state polygons.
      currMap.addLayer({
        id: 'usa-layer',
        type: 'fill',
        source: 'U.S.A.',
        paint: {
          'fill-color': 'rgba(200, 100, 240, 0.4)',
          'fill-outline-color': 'rgba(200, 100, 240, 1)',
        },
      });
      currMap.addLayer({
        id: 'canada-layer',
        type: 'fill',
        source: 'Canada',
        paint: {
          'fill-color': 'rgba(200, 100, 240, 0.4)',
          'fill-outline-color': 'rgba(200, 100, 240, 1)',
        },
      });
  
      // When a click event occurs on a feature in the states layer,
      // open a popup at the location of the click, with description
      // HTML from the click event's properties.
      currMap.on('click', 'states-layer', (e) => {
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(e.features[0].properties.name)
          .addTo(currMap);
      });
  
      // Change the cursor to a pointer when
      // the mouse is over the states layer.
      currMap.on('mouseenter', 'states-layer', () => {
        currMap.getCanvas().style.cursor = 'pointer';
      });
  
      // Change the cursor back to a pointer
      // when it leaves the states layer.
      currMap.on('mouseleave', 'states-layer', () => {
        currMap.getCanvas().style.cursor = '';
      });
    });
    
    console.log(currMap);
  });

  

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
