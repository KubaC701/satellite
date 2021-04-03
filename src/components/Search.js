import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import throttle from 'lodash.throttle';

const Search = ({ location, setLocation, className }) => {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([]);
  const THROTTLED_WAIT = 200;

  const fetchData = useMemo(() => throttle(async (input, callback) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${input}`);
    const locations = await response.json();
    callback(locations);
  }, THROTTLED_WAIT), []);

  useEffect(() => {
    let active = true;

    if (query === '') {
      setOptions(location ? [location] : []);
      return undefined;
    }

    fetchData(query, (results) => {
      if (!active) {
        return;
      }
      let newOptions = [];

      if (location) {
        newOptions = [location];
      }

      if (results) {
        newOptions = [...newOptions, ...results];
      }

      setOptions(newOptions);
    });

    return () => {
      active = false;
    };
  }, [location, query, fetchData]);

  return (
    <Container maxWidth="sm" className={className}>
      <Autocomplete
        autoComplete
        filterOptions={(x) => x}
        filterSelectedOptions
        forcePopupIcon={false}
        getOptionLabel={(option) => option.display_name}
        includeInputInList
        onChange={(_event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setLocation(newValue);
        }}
        onInputChange={(_event, newValue) => {
          setQuery(newValue);
        }}
        options={options}
        renderInput={(params) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <TextField {...params} label="Search location" fullWidth />
        )}
        value={location}
      />
    </Container>
  );
};

Search.defaultProps = {
  location: null,
};

Search.propTypes = {
  className: PropTypes.string.isRequired,
  location: PropTypes.objectOf(PropTypes.oneOfType(
    [PropTypes.string, PropTypes.number, PropTypes.array],
  )),
  setLocation: PropTypes.func.isRequired,
};

export default Search;
