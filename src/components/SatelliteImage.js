import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

const SatelliteImage = ({ location }) => {
  const [image, setImage] = useState(null);
  const fetchImage = async () => {
    const { lon, lat } = location;
    const res = await fetch(`https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&api_key=${process.env.REACT_APP_NASA_API_KEY}`);
    const blob = await res.blob();
    setImage(URL.createObjectURL(blob));
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return <Box width={1 / 2}><img src={image} alt="" /></Box>;
};

SatelliteImage.defaultProps = {
  location: null,
};

SatelliteImage.propTypes = {
  location: PropTypes.objectOf(PropTypes.oneOfType(
    [PropTypes.string, PropTypes.number, PropTypes.array],
  )),
};

export default SatelliteImage;
