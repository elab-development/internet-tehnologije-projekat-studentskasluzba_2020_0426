import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

function Navbar({token,setToken}) {
  const navigate = useNavigate();

  const handleLogout = async () => {
   
    setToken(null);
    
    sessionStorage.removeItem('token');

     
    try {
      await axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`  
        }
      });
      navigate('/');  
    } catch (error) {
      console.error('Logout error', error);
      
    }
  };

  return (
    <nav className="navbar">
      <img src="https://fon.bg.ac.rs/wp-content/uploads/2023/10/FON-Logo.svg" alt="Logo FONA" className="navbar-logo" />
      <ul className="navbar-nav">
      {token==null ?
        <>
            <li className="nav-item" onClick={() => navigate('/')}>
              Pocetna
            </li>
            <li className="nav-item" onClick={() => navigate('/univerziteti')}>
              Univerziteti
            </li>
            <li className="nav-item" onClick={() => navigate('/login')}>
              Login
            </li>

          </>
        : <>
          <li className="nav-item" onClick={() => navigate('/')}>
            Pocetna
          </li>
          <li className="nav-item" onClick={handleLogout}>
              Odjava
            </li>
      </>
      
      }
      
      
      </ul>
    </nav>
  );
}

export default Navbar;
