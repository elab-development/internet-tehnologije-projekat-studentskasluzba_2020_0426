 
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Footer from './components/Footer';
import Ispiti from './components/Ispiti';
import { useState } from 'react';
import Univerziteti from './components/Univerziteti';
import Profesor from './components/Profesor';
import PredmetDetalji from './components/PredmetDetalji';
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
          <Route path="/profesor/predmet/:id" element={<PredmetDetalji />} />
          <Route path="/profesor" element={<Profesor />} />
          <Route path="/univerziteti" element={<Univerziteti />} />
        </Routes>
        <Footer></Footer>
      </div>
  </Router>
  );
}

export default App;
