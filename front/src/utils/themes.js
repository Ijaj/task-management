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
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true, // 🔴 Disable elevation globally
      },
      styleOverrides: {
        root: {
          boxShadow: 'none', // 🔴 Prevent shadow override in all variants
          '&:hover': {
            boxShadow: 'none',
          },
          '&:active': {
            boxShadow: 'none',
          },
        },
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
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '15px',
          boxShadow:
            '0px 1px 3px 0px rgba(0, 0, 0, 0.12), 0px 23px 44px 0px rgba(176, 183, 195, 0.14)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#E0E0E0',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#60E5AE',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#60E5AE',
          },
        },
      },
    },
  },
  typography: {
    fontFamily: ['Poppins', 'Roboto', 'sans-serif'].join(','),
  },
});

export default theme;
