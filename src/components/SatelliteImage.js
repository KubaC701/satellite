import PropTypes from 'prop-types';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import useFetch from '../hooks/useFetch';

const SatelliteImage = ({ location }) => {
  const [image, isLoading, isError] = useFetch(
    `https://api.nasa.gov/planetary/earth/imagery?lon=${location.lon}&lat=${location.lat}&api_key=${process.env.REACT_APP_NASA_API_KEY}&dim=0.09`,
    { isBlob: true },
    [location],
  );
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
