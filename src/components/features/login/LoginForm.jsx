import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // Add this line

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const navigate = useNavigate(); // Add this line

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (email === 'user@gmail.com' && password === 'user') {
      navigate('/'); // Navigate to home page
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        maxWidth: 500,
        mx: 'auto',
        p: { xs: 0, sm: 1, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <TextField
        label="Email"
        name="email"
        variant="outlined"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Password"
        name="password"
        variant="outlined"
        type={formData.showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleChange}
        required
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility} edge="end">
                {formData.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ py: 1.5 }}
        fullWidth
      >
        Login
      </Button>
    </Box>
  );
}

export default LoginForm;
