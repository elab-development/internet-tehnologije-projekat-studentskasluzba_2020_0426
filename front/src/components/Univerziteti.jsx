import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Univerziteti.css';

function Univerziteti() {
    const [univerziteti, setUniverziteti] = useState([]);
    const [trenutnaStranica, setTrenutnaStranica] = useState(1);
    const [univerzitetaPoStranici] = useState(9);
    const ukupnoStranica = Math.ceil(univerziteti.length / univerzitetaPoStranici);

  useEffect(() => {
    const fetchUniverziteti = async () => {
      try {
        const response = await axios.get('http://universities.hipolabs.com/search');
        setUniverziteti(response.data);
      } catch (error) {
        console.error('Greška prilikom dohvatanja podataka o univerzitetima', error);
      }
    };

    fetchUniverziteti();
  }, []);

    const trenutniUniverziteti = univerziteti.slice(
        (trenutnaStranica - 1) * univerzitetaPoStranici,
        trenutnaStranica * univerzitetaPoStranici
    );

    const promeniStranicu = brojStranice => {
        setTrenutnaStranica(brojStranice);
    };

  return (
    <div style={{margin:"7%"}}>
     <div className="paginacija">
        <button onClick={() => promeniStranicu(1)} disabled={trenutnaStranica === 1}>Prva</button>
        <button onClick={() => promeniStranicu(trenutnaStranica - 1)} disabled={trenutnaStranica === 1}>Prethodna</button>
        <button onClick={() => promeniStranicu(trenutnaStranica + 1)} disabled={trenutnaStranica === ukupnoStranica}>Sledeća</button>
        <button onClick={() => promeniStranicu(ukupnoStranica)} disabled={trenutnaStranica === ukupnoStranica}>Poslednja</button>
      </div>
   
    <div className="univerziteti-container">
        
      {trenutniUniverziteti.map((uni, index) => (
        <div key={index} className="univerzitet">
          <h2>{uni.name}</h2>
          <p>{uni.country}</p>
          <a href={`http://${uni.web_pages[0]}`} target="_blank" rel="noreferrer">Posetite sajt</a>
        </div>
      ))}
       </div>
      <div className="paginacija">
        <button onClick={() => promeniStranicu(1)} disabled={trenutnaStranica === 1}>Prva</button>
        <button onClick={() => promeniStranicu(trenutnaStranica - 1)} disabled={trenutnaStranica === 1}>Prethodna</button>
        <button onClick={() => promeniStranicu(trenutnaStranica + 1)} disabled={trenutnaStranica === ukupnoStranica}>Sledeća</button>
        <button onClick={() => promeniStranicu(ukupnoStranica)} disabled={trenutnaStranica === ukupnoStranica}>Poslednja</button>
      </div>
   
      </div>
  );
}

export default Univerziteti;
