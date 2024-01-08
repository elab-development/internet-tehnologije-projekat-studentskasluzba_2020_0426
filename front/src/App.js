 
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Footer from './components/Footer';
import Ispiti from './components/Ispiti';
import { useState } from 'react';
function App() {

  const [token,setToken] = useState(null);


  return (
    <Router>
      <div className="App">
        <Navbar token={token}  setToken={setToken}/>  
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login  setToken={setToken}/>} />
          <Route path="/ispiti" element={<Ispiti />} />
        </Routes>
        <Footer></Footer>
      </div>
  </Router>
  );
}

export default App;
