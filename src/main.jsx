import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import CustomThemeProvider from "./context/ThemeContext";

createRoot(document.getElementById('root')).render(

  <CustomThemeProvider>
    <App />
  </CustomThemeProvider>
)
