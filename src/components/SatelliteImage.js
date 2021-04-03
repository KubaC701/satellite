import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress } from '@material-ui/core';

const SatelliteImage = ({ location }) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchImage = async () => {
    const { lon, lat } = location;
    setIsLoading(true);
    const res = await fetch(`https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&api_key=${process.env.REACT_APP_NASA_API_KEY}&dim=0.09`);
    const blob = await res.blob();
    setImage(URL.createObjectURL(blob));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <Box
      className="box"
      bgcolor="primary.main"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {isLoading ? <CircularProgress color="secondary" /> : <img src={image} alt="" />}
    </Box>
  );
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
