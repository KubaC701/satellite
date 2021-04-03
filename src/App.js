import {
  Box, Container, CssBaseline, Typography,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useState } from 'react';
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
    },
    typography: {
      fontFamily: 'Raleway',
      h1: {
        fontWeight: 700,
        fontSize: 80,
      },
    },
  });
  const [location, setLocation] = useState(null);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box position="absolute" height={1} width={1} zIndex={-1}>
        <img src="/images/space.jpg" alt="View of Earth from space" className="background" />
      </Box>
      <Container>
        <Box paddingTop={6} paddingBottom={2}>
          <Typography variant="h1" align="center">Satellite</Typography>
        </Box>
        <Search location={location} setLocation={setLocation} />
        {location && <SatelliteImage location={location} />}
      </Container>
    </ThemeProvider>
  );
};

export default App;
