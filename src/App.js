import {
  Box, Container, CssBaseline, Grid, Slide, Typography, useMediaQuery,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useState } from 'react';
import Map from './components/Map';
import SatelliteImage from './components/SatelliteImage';
import Search from './components/Search';

const App = () => {
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#F8F8F8',
      },
      secondary: {
        main: blue[700],
      },
      text: {
        primary: '#F8F8F8',
      },
      background: {
        default: '#000',
      },
    },
    typography: {
      fontFamily: 'Raleway',
      h1: {
        fontWeight: 700,
        fontSize: 80,
        '@media (max-width:400px)': {
          fontSize: 60,
        },
      },
    },
  });
  const [location, setLocation] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box position="absolute" height={1} width={1} zIndex={-1}>
        <img
          src="/images/space.jpg"
          alt="View of Earth from space"
          className={`background ${location && 'background--invisible'}`}
        />
      </Box>
      <Container>
        <div>
          <Box paddingTop={6} paddingBottom={2}>
            <Typography
              variant="h1"
              align="center"
              className={`heading ${location && 'heading--small'}`}
            >
              Satellite
            </Typography>
          </Box>
          <Search
            location={location}
            setLocation={setLocation}
            className={`search ${location && 'search--small'}`}
          />
        </div>
        <Slide direction="up" in={!!location} mountOnEnter unmountOnExit timeout={600}>
          <Box marginTop={8} maxHeight="100vh">
            <Grid spacing={2} container direction={isMobile ? 'column' : 'row'}>
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
