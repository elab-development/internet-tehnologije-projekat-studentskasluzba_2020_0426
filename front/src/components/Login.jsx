import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 

function Login({setToken}) {
  const [email, setEmail] = useState('nicolas.imelda@example.com');  
  const [password, setPassword] = useState('password');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
        type:'student'  //ovo moramo da dodajemo jer u laravelu imamo razlicite uloge
      });
       
      sessionStorage.setItem('token', response.data.access_token);
      sessionStorage.setItem('auth_id', response.data.user.id);
      setToken(response.data.access_token)
      navigate('/ispiti');
    } catch (error) {
      console.error('Login error', error.response.data);
    
    }
  };

  return (
    <div className="login-container">
      <img src="https://fon.bg.ac.rs/wp-content/uploads/2023/10/FON-Logo.svg" alt="Logo FONA" className="login-logo" />
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Unesite email"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Unesite lozinku"
          required
        />
        <button type="submit" className="login-button">Submit</button>
      </form>
    </div>
  );
}

export default Login;
