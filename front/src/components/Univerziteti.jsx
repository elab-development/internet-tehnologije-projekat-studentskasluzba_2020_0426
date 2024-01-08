import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Univerziteti.css';

function Univerziteti() {
  const [univerziteti, setUniverziteti] = useState([]);

  useEffect(() => {
    const fetchUniverziteti = async () => {
      try {
        const response = await axios.get('http://universities.hipolabs.com/search');
        setUniverziteti(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Greška prilikom dohvatanja podataka o univerzitetima', error);
      }
    };

    fetchUniverziteti();
  }, []);

  return (
    <div className="univerziteti-container">
      {univerziteti.map((uni, index) => (
        <div key={index} className="univerzitet">
          <h2>{uni.name}</h2>
          <p>{uni.country}</p>
          <a href={`http://${uni.web_pages[0]}`} target="_blank" rel="noreferrer">Posetite sajt</a>
        </div>
      ))}
    </div>
  );
}

export default Univerziteti;
