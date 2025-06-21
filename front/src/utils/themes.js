import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#60E5AE',
      contrastText: '#000000',
    },
    secondary: {
      main: '#C716F3',
    },
    error: {
      main: '#FF4C24',
      light: '#FF4C2426',
      contrastText: '#FF4C24',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#60E5AE',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#4acb9c',
          },
        },
        containedSecondary: {
          backgroundColor: '#C716F3',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#a10dc8',
          },
        },
        containedError: {
          backgroundColor: '#FF4C2426',
          color: '#FF4C24',
          '&:hover': {
            backgroundColor: '#FF4C2426',
            opacity: 0.85,
          },
        },
      },
    },
  },
});

export default theme;
