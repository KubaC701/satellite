import { useState } from 'react';
import {
  Box, Container, CssBaseline, Grid, Slide, ThemeProvider, Typography, useMediaQuery,
} from '@material-ui/core';

import theme from './styles/theme';

import Map from './components/Map';
import SatelliteImage from './components/SatelliteImage';
import Search from './components/Search';

const App = () => {
  const [location, setLocation] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box height={1} position="absolute" width={1} zIndex={-1}>
        <img
          alt="View of Earth from space"
          className={`background ${location && 'background--invisible'}`}
          src="/images/space.jpg"
        />
      </Box>
      <Container>
        <Box paddingBottom={2} paddingTop={6}>
          <Typography
            align="center"
            className={`heading ${location && 'heading--small'}`}
            variant="h1"
          >
            Satellite
          </Typography>
        </Box>
        <Search
          className={`search ${location && 'search--small'}`}
          location={location}
          setLocation={setLocation}
        />
        <Slide
          direction="up"
          in={!!location}
          mountOnEnter
          timeout={600}
          unmountOnExit
        >
          <Box marginTop={8}>
            <Grid
              container
              direction={isMobile ? 'column' : 'row'}
              spacing={2}
              wrap="nowrap"
            >
              <Grid item xs>
                <SatelliteImage location={location} />
              </Grid>
              <Grid item xs>
                <Map lat={location?.lat} lon={location?.lon} />
              </Grid>
            </Grid>
          </Box>
        </Slide>
      </Container>
    </ThemeProvider>
  );
};

export default App;
