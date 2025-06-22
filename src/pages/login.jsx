import {
    Box,
    Typography,
    Paper,
  } from '@mui/material';
  import LoginForm from '../components/features/login/LoginForm';
  
  function Login() {
    return (
      <Box
        sx={{
          minHeight: '90vh',
          background: 'linear-gradient(to right, #e3f2fd, #ffffff)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            borderRadius: 4,
            width: {
              xs: '90%', // 90% width on extra small screens
              sm: '70%',
              md: '50%',
              lg: '40%',
            },
          }}
        >
          <Box
            sx={{
              p: {
                xs: 3,
                sm: 4,
                md: 2,
              },
            }}
          >
            <Typography
              variant="h4"
              fontWeight={600}
              gutterBottom
              sx={{ textAlign: 'center' }}
            >
              Welcome Back to
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              mb={3}
              sx={{ textAlign: 'center' }}
            >
              Please login to your account
            </Typography>
  
            <LoginForm />
          </Box>
        </Paper>
      </Box>
    );
  }
  
  export default Login;
  