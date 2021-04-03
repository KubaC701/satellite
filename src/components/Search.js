import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import throttle from 'lodash.throttle';
import { Container } from '@material-ui/core';

const Search = ({ location, setLocation }) => {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([]);

  const fetchData = useMemo(() => throttle(async (input, callback) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${input}`);
    const locations = await response.json();
    callback(locations);
  }, 200), []);

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
    <Container maxWidth="sm">
      <Autocomplete
        forcePopupIcon={false}
        getOptionLabel={(option) => option.display_name}
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={location}
        onChange={(_event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setLocation(newValue);
        }}
        onInputChange={(_event, newValue) => {
          setQuery(newValue);
        }}
        renderInput={(params) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <TextField {...params} label="Add a location" fullWidth />
        )}
      />
    </Container>
  );
};

Search.defaultProps = {
  location: null,
};

Search.propTypes = {
  location: PropTypes.objectOf(PropTypes.oneOfType(
    [PropTypes.string, PropTypes.number, PropTypes.array],
  )),
  setLocation: PropTypes.func.isRequired,
};

export default Search;
