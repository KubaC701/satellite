import { createMuiTheme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

export default createMuiTheme({
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
