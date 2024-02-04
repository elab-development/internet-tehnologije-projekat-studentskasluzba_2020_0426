import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PredmetDetalji() {
  const { id } = useParams();
  const [predmet, setPredmet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/predmeti/${id}`, { headers });
        setPredmet(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Greška prilikom dobijanja podataka o predmetu:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <p>Učitavanje...</p>;
  }

  if (!predmet) {
    return <p>Podaci o predmetu nisu pronađeni.</p>;
  }

  return (
    <div className="predmet-detalji-container">
      <h1>Detalji o predmetu</h1>
      <table className="predmet-detalji-table">
        <tbody>
          <tr>
            <td>ID:</td>
            <td>{predmet.id}</td>
          </tr>
          <tr>
            <td>Naziv:</td>
            <td>{predmet.naziv}</td>
          </tr>
          <tr>
            <td>ESBP:</td>
            <td>{predmet.esbp}</td>
          </tr>
          <tr>
            <td>Semestar:</td>
            <td>{predmet.semestar}</td>
          </tr>
          <tr>
            <td>Tip:</td>
            <td>{predmet.tip}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PredmetDetalji;
