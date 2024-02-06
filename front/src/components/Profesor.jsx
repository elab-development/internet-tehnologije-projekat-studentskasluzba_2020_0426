import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profesor() {
  const [predmeti, setPredmeti] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPredmeti = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`,
        };
        const response = await axios.get('http://127.0.0.1:8000/api/predmeti/profesor', { headers });
        setPredmeti(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Greška prilikom dobijanja predmeta:', error);
        setLoading(false);
      }
    };

    fetchPredmeti();
  }, []);

  const navigate = useNavigate();

  const handleDetaljiClick = (predmetId) => {
    navigate(`/profesor/predmet/${predmetId}`);
  };

  const handleDeleteClick = async (predmetId) => {
    try {
      const token = sessionStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };
      await axios.delete(`http://127.0.0.1:8000/api/predmeti/${predmetId}`, { headers });
      // Ažurirajte listu predmeta nakon brisanja
      setPredmeti(predmeti.filter((predmet) => predmet.id !== predmetId));
    } catch (error) {
      console.error('Greška prilikom brisanja predmeta:', error);
    }
  };

  if (loading) {
    return <p>Učitavanje...</p>;
  }

  return (
    <div className="predmeti-container">
      <h1>Moji predmeti:</h1>
      <table className="predmeti-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Naziv</th>
            <th>Akcije</th>
            <th>Obriši</th> {/* Dodali smo kolonu za brisanje */}
          </tr>
        </thead>
        <tbody>
          {predmeti.map((predmet) => (
            <tr key={predmet.id}>
              <td>{predmet.id}</td>
              <td>{predmet.naziv}</td>
              <td>
                <button onClick={() => handleDetaljiClick(predmet.id)}>Detalji</button>
              </td>
              <td>
                <button onClick={() => handleDeleteClick(predmet.id)}>Obriši</button> {/* Dodali smo dugme za brisanje */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Profesor;
