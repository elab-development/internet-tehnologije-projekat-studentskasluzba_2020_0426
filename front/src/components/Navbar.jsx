import React from 'react';
import { useNavigate } from 'react-router-dom';
 
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <img src="https://fon.bg.ac.rs/wp-content/uploads/2023/10/FON-Logo.svg" alt="Logo FONA" className="navbar-logo" />
      <ul className="navbar-nav">
      <li className="nav-item" onClick={() => navigate('/')}>
          Pocetna
        </li>
        <li className="nav-item" onClick={() => navigate('/login')}>
          Login
        </li>
      
      </ul>
    </nav>
  );
}

export default Navbar;
