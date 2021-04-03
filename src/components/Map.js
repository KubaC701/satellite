/* eslint-disable no-undef */
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Map = ({ lat, lon }) => {
  const ZOOM = 13;
  useEffect(() => {
    const map = L.map('map').setView([lat, lon], ZOOM);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  }, []);
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
