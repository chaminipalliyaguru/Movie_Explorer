import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetail from './components/features/home/MovieDetail';

function App() {
  
  return (
    <>
      <Router>
        <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
      </Router>
    </>
  )
}

export default App
