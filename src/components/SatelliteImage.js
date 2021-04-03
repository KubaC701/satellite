import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, CircularProgress, Icon, Typography,
} from '@material-ui/core';

const SatelliteImage = ({ location }) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchImage = async () => {
    setIsLoading(true);
    setIsError(false);
    const { lon, lat } = location;

    try {
      const res = await fetch(`https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&api_key=${process.env.REACT_APP_NASA_API_KEY}&dim=0.09`);
      if (!res.ok) {
        const { msg } = await res.json();
        throw new Error(msg);
      }
      const blob = await res.blob();
      setImage(URL.createObjectURL(blob));
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchImage();
    }
  }, [location]);

  return (
    <Box
      alignItems="center"
      bgcolor="primary.main"
      className="box"
      display="flex"
      justifyContent="center"
    >
      {isLoading ? <CircularProgress color="secondary" /> : <img src={image} alt="" />}
      {isError && (
        <>
          <Icon color="error" fontSize="large">error</Icon>
          <Typography color="error">Something went wrong!</Typography>
        </>
      )}
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
