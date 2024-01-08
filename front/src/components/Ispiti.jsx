import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IspitRed from './IspitRed';
import './Ispiti.css';

function Ispiti() {
  
  const [ispiti, setIspiti] = useState([]);
  const [ukupnoESP, setUkupnoESP] = useState(0);
  const [prosecnaOcena, setProsecnaOcena] = useState(0);
  const [pretraga, setPretraga] = useState('');
  const [sortirajPo, setSortirajPo] = useState(null);
  const [sortSmer, setSortSmer] = useState('asc');
  useEffect(() => {
    const fetchIspiti = async () => {
      const authId = sessionStorage.getItem('auth_id'); //  ID ulogovanog studenta
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/ispiti', {
          params: { 
            auth_id: authId, 
          },
        });
        // Filtriramo ispite tako da prikažemo samo one koji pripadaju ulogovanom studentu
        const filteredIspiti = response.data.data.filter(ispit => ispit.student.id.toString() === authId);
        setIspiti(filteredIspiti); 

        //uzimamo samo polozene ispite
        const validIspiti = response.data.data.filter(ispit => ispit.ocena > 5);
        setIspiti(validIspiti);

        // Izračunavamo ukupno ESP i prosečnu ocenu
        const totalESP = validIspiti.reduce((sum, ispit) => sum + ispit.predmet.esbp, 0);
        setUkupnoESP(totalESP);

        const averageGrade = validIspiti.reduce((sum, ispit) => sum + ispit.ocena, 0) / validIspiti.length;
        setProsecnaOcena(averageGrade.toFixed(2)); 
      } catch (error) {
        console.error('Error fetching ispiti', error);
      }
    };
  
    fetchIspiti();
  }, []);
  const toggleSortSmer = () => {
    setSortSmer(prevSortSmer => (prevSortSmer === 'asc' ? 'desc' : 'asc'));
    setSortirajPo('ocena');  
  };
  useEffect(() => {
    if (sortirajPo === 'ocena') {
      setIspiti(prevIspiti => [...prevIspiti].sort((a, b) => {
        return sortSmer === 'asc' ? a.ocena - b.ocena : b.ocena - a.ocena;
      }));
    }
  }, [sortirajPo, sortSmer]);

  const filtriraniIspiti = ispit => {
    return (
      ispit.predmet.naziv.toLowerCase().includes(pretraga.toLowerCase()) ||
      ispit.predmet.profesor.ime.toLowerCase().includes(pretraga.toLowerCase()) ||
      ispit.predmet.profesor.prezime.toLowerCase().includes(pretraga.toLowerCase())
    );
  };
  return (
    <div className="ispiti-container">
         <div className="controls">
        <input
          type="text"
          className="search-input"
          placeholder="Pretraži predmete ili profesore"
          value={pretraga}
          onChange={(e) => setPretraga(e.target.value)}
        />
        <button onClick={toggleSortSmer}>
          Sortiraj po oceni ({sortSmer === 'asc' ? 'rastuće' : 'opadajuće'})
        </button>
      </div>
      <table className="ispiti-table">
        <thead>
          <tr>
            <th>Datum</th>
            <th>Predmet</th> 
            <th>Br. esp</th> 
            <th>Profesor</th>
            <th>Ocena</th>
            <th>Opisna ocena</th>
          </tr>
        </thead>
        <tbody>
            {ispiti.filter(filtriraniIspiti).map((ispit) => (
                <IspitRed key={ispit.id} ispit={ispit} />
            ))}
        </tbody>
      </table>
      <div className="ispiti-summary">
          <p>Ukupan broj ESP bodova: {ukupnoESP}</p>
          <p>Prosečna ocena: {prosecnaOcena}</p>
        </div>
    </div>
  );
}

export default Ispiti;
