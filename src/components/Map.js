/* eslint-disable no-undef */
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Map = ({ lat, lon }) => {
  const ZOOM = 13;
  const map = useRef(null);

  useEffect(() => {
    map.current = L.map('map').setView([lat, lon], ZOOM);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map.current);
  }, []);

  useEffect(() => {
    map.current.setView([lat, lon], ZOOM);
  }, [lat, lon]);

  return <div id="map" style={{ height: '100%' }} />;
};

Map.defaultProps = {
  lat: '',
  lon: '',
};

Map.propTypes = {
  lat: PropTypes.string,
  lon: PropTypes.string,
};

export default Map;
