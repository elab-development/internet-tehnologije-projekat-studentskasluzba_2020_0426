 
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Footer from './components/Footer';
import Ispiti from './components/Ispiti';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />  
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ispiti" element={<Ispiti />} />
        </Routes>
        <Footer></Footer>
      </div>
  </Router>
  );
}

export default App;
