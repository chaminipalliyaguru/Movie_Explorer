import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetail from './components/features/home/MovieDetail';
import { CssBaseline, Box } from "@mui/material";

function App() {
  
  return (
    <>
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Router>
        <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
      </Router>
      </Box>
    </>
  )
}

export default App
