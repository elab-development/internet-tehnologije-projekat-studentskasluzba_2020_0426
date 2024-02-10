import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Univerziteti.css';
import Kartica from './Kartica';
import { useQuery } from 'react-query';
function Univerziteti() {
  const [trenutnaStranica, setTrenutnaStranica] = useState(1);
  const [univerzitetaPoStranici] = useState(9);
  const [trenutnaDrzava, setTrenutnaDrzava] = useState('');

  const fetchUniverziteti = async () => {
    const { data } = await axios.get('http://universities.hipolabs.com/search');
    return data;
  };

  const { data: univerziteti, isLoading, error } = useQuery('univerziteti', fetchUniverziteti);

  if (isLoading) return 'Učitavanje...';
  if (error) return 'Došlo je do greške prilikom dohvatanja podataka';

  const filtriraniUniverziteti = trenutnaDrzava 
    ? univerziteti?.filter(uni => uni.country === trenutnaDrzava)
    : univerziteti;

  const ukupnoStranica = Math.ceil(filtriraniUniverziteti?.length / univerzitetaPoStranici);

  const trenutniUniverziteti = filtriraniUniverziteti?.slice(
    (trenutnaStranica - 1) * univerzitetaPoStranici,
    trenutnaStranica * univerzitetaPoStranici
  );


    const promeniStranicu = brojStranice => {
        setTrenutnaStranica(brojStranice);
    };

 

  return (
    <div style={{margin:"7%"}}>
      <div className="filteri">
                <button onClick={() => setTrenutnaDrzava('France')}>France</button>
                <button onClick={() => setTrenutnaDrzava('Chile')}>Chile</button>
                <button onClick={() => setTrenutnaDrzava('Ukraine')}>Ukraine</button>
                <button onClick={() => setTrenutnaDrzava('United Kingdom')}>United Kingdom</button>
                <button onClick={() => setTrenutnaDrzava('')}>Svi Univerziteti</button>
            </div>
     <div className="paginacija">
        <button onClick={() => promeniStranicu(1)} disabled={trenutnaStranica === 1}>Prva</button>
        <button onClick={() => promeniStranicu(trenutnaStranica - 1)} disabled={trenutnaStranica === 1}>Prethodna</button>
        <button onClick={() => promeniStranicu(trenutnaStranica + 1)} disabled={trenutnaStranica === ukupnoStranica}>Sledeća</button>
        <button onClick={() => promeniStranicu(ukupnoStranica)} disabled={trenutnaStranica === ukupnoStranica}>Poslednja</button>
      </div>
   
    <div className="univerziteti-container">
        
      {trenutniUniverziteti.map((uni,index) => (
          <Kartica key={index} uni={uni}></Kartica>
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
