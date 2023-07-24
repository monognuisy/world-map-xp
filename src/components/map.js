import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import { tokenRecord } from '../token';

import { worlds } from '../assets/worldData';

import { polyColors } from '../utils/colors';
import Sidebox from './sidebox';

mapboxgl.accessToken = tokenRecord.pub;

// number of total colors.
const NUMOFCOLORS = 6;

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  //
  const [sideboxOpened, setSideboxOpened] = useState(false);
  const [countryName, setCountryName] = useState('');
  const [countryProperty, setCountryProperty] = useState(null);
  const colorStage = useRef([]);

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
          // 'fill-color': 'rgba(200, 100, 240, 1)',
          'fill-color': [
            'case',
            ['==', ['feature-state', 'color'], 0],
            `${polyColors.transparent}`,
            ['==', ['feature-state', 'color'], 1],
            `${polyColors.lightBlue}`,
            ['==', ['feature-state', 'color'], 2],
            `${polyColors.green}`,
            ['==', ['feature-state', 'color'], 3],
            `${polyColors.yellow}`,
            ['==', ['feature-state', 'color'], 4],
            `${polyColors.red}`,
            ['==', ['feature-state', 'color'], 5],
            `${polyColors.purple}`,
            `${polyColors.transparent}`,
          ],
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1.5,
            0.8,
          ],
          'fill-outline-color': 'rgba(200, 100, 240, 1)',
        },
      });

      // onClick
      currMap.on('click', 'states-layer', (e) => {
        // Prevent default click events.
        e.preventDefault();

        setCountryProperty(e.features[0].properties);

        const cname = e.features[0].properties.geounit;
        // new mapboxgl.Popup().setLngLat(e.lngLat).setHTML(cname).addTo(currMap);

        // // Set color stage of clicked country.
        // const currCountryId = e.features[0].id;

        // if (colorStage[currCountryId] === undefined) {
        //   colorStage[currCountryId] = 1;
        // } else {
        //   colorStage[currCountryId] = (colorStage[currCountryId] + 1) % 6;
        // }

        setCountryName(cname);
        setSideboxOpened(true);
        // currMap.setFeatureState(
        //   { source: 'states', id: hoveredPolygonId },
        //   { color: colorStage[currCountryId] },
        // );
      });

      // Close sidebox when press outside of the countries.
      currMap.on('click', (e) => {
        e.defaultPrevented || setSideboxOpened(false);
      });

      // onMove
      currMap.on('mousemove', 'states-layer', (e) => {
        currMap.getCanvas().style.cursor = 'pointer';
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

      // onLeave
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
      {sideboxOpened ? (
        <Sidebox
          countryName={countryName}
          countryProperty={countryProperty}
          setSideboxOpened={setSideboxOpened}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
export default Map;
