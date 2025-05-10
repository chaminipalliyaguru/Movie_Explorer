import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Navbar from './components/Navbar';

function App() {
  
  return (
    <>
      <Router>
        <Navbar/>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
      </Router>
    </>
  )
}

export default App
