import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profesor() {
  const [predmeti, setPredmeti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    naziv: '',
    esbp: '',
    semestar: '',
    tip: 'obavezan',
  });
  const [isFormOpen, setIsFormOpen] = useState(false); // Dodato stanje za otvaranje/zatvaranje modala
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

      setPredmeti(predmeti.filter((predmet) => predmet.id !== predmetId));
    } catch (error) {
      console.error('Greška prilikom brisanja predmeta:', error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };
      console.log(formData);
      const response = await axios.post('http://127.0.0.1:8000/api/predmeti', formData, { headers });
      setPredmeti([...predmeti, response.data.data]);

      setFormData({
        naziv: '',
        esbp: '',
        semestar: '',
        tip: 'obavezan',
      });

      // Zatvaranje modala nakon dodavanja predmeta
      setIsFormOpen(false);
    } catch (error) {
      console.error('Greška prilikom dodavanja predmeta:', error);
    }
  };

  if (loading) {
    return <p>Učitavanje...</p>;
  }

  return (
    <div className="predmeti-container">
      <button onClick={() => setIsFormOpen(true)}>Dodaj novi predmet</button>
 
      {isFormOpen && (
        <div className="modal">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Naziv:</label>
              <input type="text" name="naziv" value={formData.naziv} onChange={handleChange} required />
            </div>
            <div>
              <label>ESBP:</label>
              <input type="number" name="esbp" value={formData.esbp} onChange={handleChange} required />
            </div>
            <div>
              <label>Semestar:</label>
              <input type="number" name="semestar" value={formData.semestar} onChange={handleChange} required />
            </div>
            <div>
              <label>Tip:</label>
              <select name="tip" value={formData.tip} onChange={handleChange} required>
                <option value="obavezan">Obavezan</option>
                <option value="izborni">Izborni</option>
              </select>
            </div>
            <button type="submit">Dodaj predmet</button>
            <button type="button" onClick={() => setIsFormOpen(false)}>Zatvori</button> {/* Dugme za zatvaranje modala */}
          </form>
        </div>
      )}

      <h1>Moji predmeti:</h1>
      <table className="predmeti-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Naziv</th>
            <th>Akcije</th>
            <th>Obriši</th>
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
                <button onClick={() => handleDeleteClick(predmet.id)}>Obriši</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Profesor;
