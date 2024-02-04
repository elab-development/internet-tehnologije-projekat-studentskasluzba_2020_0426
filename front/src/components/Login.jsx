import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setToken }) {
  const [email, setEmail] = useState('ardella.medhurst@example.net');
  const [password, setPassword] = useState('password');
  const [userType, setUserType] = useState('student'); // Dodato smo polje za izbor uloge
  const navigate = useNavigate(); 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
        type: userType, // Koristimo vrednost userType za polje 'type'
      });
      console.log(response);
      sessionStorage.setItem('token', response.data.access_token);
      sessionStorage.setItem('auth_id', response.data.user.id);
      setToken(response.data.access_token);

      // Usmeravanje korisnika u zavisnosti od uloge
      if (userType === 'student') {
        navigate('/ispiti');
      } else if (userType === 'profesor') {
        navigate('/profesor');
      }
    } catch (error) {
      console.error('Login error', error.response.data);
      alert(error.response.data.message || 'Došlo je do greške prilikom prijave.');
    }
    
  };

  return (
    <div className="login-container">
      <h1>Prijavi se na sistem</h1>
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

        {/* Dodato smo polje za izbor uloge */}
        <label>
          Odaberi ulogu 
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="login-input"
          >
            <option value="student">Student</option>
            <option value="profesor">Profesor</option>
          </select>
        </label>

        <button type="submit" className="login-button">Submit</button>
      </form>
    </div>
  );
}

export default Login;
