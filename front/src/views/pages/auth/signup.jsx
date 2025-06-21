import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Link,
  Paper,
  useMediaQuery
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

// blur imports

const Signup = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      {!isMobile && (
        <Grid
          size={{
            sm: 5,
            md: 6,
            sx: {
              backgroundColor: '#081323',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }
          }}
        >
          <Box sx={{
            bgcolor: '#040612',
            width: '100%',
            height: '100%',
            position: 'relative',
          }}>
            <Box sx={{
              position: 'absolute',
              top: '-111px',
              left: '-120px',
              width: '223px',
              height: '240px',
              bgcolor: '#60E5AE',
              filter: 'blur(120px)',
              borderRadius: '100%',
            }} />
            <Box sx={{
              position: 'absolute',
              top: '70%',
              left: '15%',
              width: '583px',
              height: '101px',
              bgcolor: '#60E5AE',
              filter: 'blur(150px)',
            }} />
            <Box sx={{
              position: 'absolute',
              top: '75%',
              left: '65%',
              width: '223px',
              height: '240px',
              bgcolor: '#60E5AE',
              filter: 'blur(120px)',
              borderRadius: '100%',
            }} />
            <img
              src="/signup-page.png"
              alt="illustration"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '50%'
              }}
            />
          </Box>
        </Grid>
      )}

      <Grid
        size={{
          xs: 12,
          sm: 7,
          md: 6
        }}
        component={Paper}
        elevation={6}
        square
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Container maxWidth="md">
          <Box sx={{ my: 4, width: '100%' }}>
            <Typography component="h1" variant="h5" fontWeight="bold" gutterBottom textAlign={'center'}>
              Ssign Up
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }} textAlign={'center'}>
              To Create Account, Please Fill in the From Below.
            </Typography>

            <TextField
              fullWidth
              margin="normal"
              name="name"
              label="Full Name"
              placeholder="Enter your full name"
              type="text"
            />

            <TextField
              fullWidth
              margin="normal"
              name="email"
              label="Email Address"
              placeholder="Enter your email address"
              type="email"
            />

            <TextField
              fullWidth
              margin="normal"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              name="re_password"
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
            />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 1, mb: 2 }}
            >
              <FormControlLabel control={<Checkbox />} label="Remember me" />
              <Link color='textPrimary' href="/auth/reset" variant="body2" sx={{ textDecoration: 'none' }}>
                Forgot password?
              </Link>
            </Box>

            <Button fullWidth variant="contained" color="primary" sx={{ mb: 2 }} disableElevation>
              Sing Up
            </Button>

            <Divider>Or</Divider>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account?{' '}
              <Link color='textPrimary' href="/auth/login" variant="body2" fontWeight="bold" sx={{ textDecoration: 'none' }}>
                Login
              </Link>
            </Typography>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Signup;
