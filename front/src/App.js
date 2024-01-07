 
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />  
        <Routes>
          <Route path="/" element={<Home />} />
          
        </Routes>
      </div>
  </Router>
  );
}

export default App;
