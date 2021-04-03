import { CssBaseline, Typography } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useState } from 'react';
import Search from './components/Search';

const App = () => {
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });
  const [location, setLocation] = useState(null);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <img src="/images/space.jpg" alt="" className="background" />
        <Typography variant="h1" align="center">Satellite</Typography>
        <Search location={location} setLocation={setLocation} />
      </div>
    </ThemeProvider>
  );
};

export default App;
