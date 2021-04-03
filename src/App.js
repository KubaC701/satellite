import { Box, CssBaseline, Typography } from '@material-ui/core';
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
      <div className="app">
        <img src="/images/space.jpg" alt="" className="background" />
        <Box paddingTop={6} paddingBottom={2}>
          <Typography variant="h1" align="center">Satellite</Typography>
        </Box>
        <Search location={location} setLocation={setLocation} />
        {location && <SatelliteImage location={location} />}
      </div>
    </ThemeProvider>
  );
};

export default App;
