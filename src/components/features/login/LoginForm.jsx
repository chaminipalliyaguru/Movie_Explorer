import React, { useState } from 'react';
import {
    TextField,
    Button,
    InputAdornment,
    IconButton,
  } from '@mui/material';
  import { Visibility, VisibilityOff } from '@mui/icons-material';

function LoginForm(){

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        showPassword: false,
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const togglePasswordVisibility = () => {
        setFormData({ ...formData, showPassword: !formData.showPassword });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Logging in with:', formData.email, formData.password);
      };

    return(
        <>
        <form onSubmit={handleSubmit}>
                <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Password"
                  name="password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  type={formData.showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  required
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
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, py: 1.5 }}
                >
                  Login
                </Button>
              </form>
        </>
    );
}

export default LoginForm;