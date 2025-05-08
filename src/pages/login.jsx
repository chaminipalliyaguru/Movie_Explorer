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
      <Paper elevation={4} sx={{ borderRadius: 4, maxWidth: 500, width: '50%' }}>
            <Box sx={{ p: 5 }}>
              <Typography variant="h4" fontWeight={600} gutterBottom>
                Welcome Back
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={3}>
                Please login to your account
              </Typography> 

              <LoginForm/>  {/* Add login form */}
              
            </Box>
      </Paper>
    </Box>
  );
}

export default Login;