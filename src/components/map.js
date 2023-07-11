import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import { tokenRecord } from '../token';

import { worlds } from '../assets/worldData';

mapboxgl.accessToken = tokenRecord.pub;

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    let hoveredPolygonId = null;
    // 처음에만 map 초기화
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });

    const currMap = map?.current;

    currMap.on('load', () => {
      // 나라 polygon의 데이터 추가
      currMap.addSource('states', {
        type: 'geojson',
        data: worlds,
      });

      // 추가된 나라의 polygon을 보여주는 레이어를 추가
      currMap.addLayer({
        id: 'states-layer',
        type: 'fill',
        source: 'states',
        paint: {
          'fill-color': 'rgba(200, 100, 240, 1)',
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            0.8,
            0.5,
          ],
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
      currMap.on('mousemove', 'states-layer', (e) => {
        currMap.getCanvas().style.cursor = 'pointer';
        console.log(e.features[0]);
        if (e.features.length > 0) {
          if (hoveredPolygonId !== null) {
            currMap.setFeatureState(
              { source: 'states', id: hoveredPolygonId },
              { hover: false },
            );
          }
          hoveredPolygonId = e.features[0].id;
          currMap.setFeatureState(
            { source: 'states', id: hoveredPolygonId },
            { hover: true },
          );
        }
      });

      // Change the cursor back to a pointer
      // when it leaves the states layer.
      currMap.on('mouseleave', 'states-layer', () => {
        currMap.getCanvas().style.cursor = '';
        if (hoveredPolygonId !== null) {
          currMap.setFeatureState(
            { source: 'states', id: hoveredPolygonId },
            { hover: false },
          );
        }
        hoveredPolygonId = null;
      });
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
export default Map;
