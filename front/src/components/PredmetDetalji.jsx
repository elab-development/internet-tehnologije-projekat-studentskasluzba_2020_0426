import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function PredmetDetalji() {
  const { id } = useParams();
  const [predmet, setPredmet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };

    const fetchDataAndStatistike = async () => {
      try {
        // Dohvatite podatke o predmetu
        const responsePredmet = await axios.get(`http://127.0.0.1:8000/api/predmeti/${id}`, { headers });
        setPredmet(responsePredmet.data.data);

        // Dohvatite statistike
        const responseStatistike = await axios.get(`http://127.0.0.1:8000/api/predmeti/statistike/${id}`, { headers });
        const statistike = responseStatistike.data.statistike;
        
        // Pripremite podatke za grafikon
        const labels = Object.keys(statistike);
        const data = Object.values(statistike);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Broj studenata',
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(75,192,192,0.6)',
              hoverBorderColor: 'rgba(75,192,192,1)',
              data: data,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error('Greška prilikom dobijanja podataka:', error);
        setLoading(false);
      }
    };

    fetchDataAndStatistike();
  }, [id]);

  if (loading) {
    return <p>Učitavanje...</p>;
  }

  if (!predmet) {
    return <p>Podaci o predmetu nisu pronađeni.</p>;
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true, // Počni oznaku na nuli
        max: 10, // Postavi maksimalnu vrednost na 10
        stepSize: 1, // Postavi korak na 1
      },
    },
  };

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

      <h2>Statistike ocena</h2>
      <div className="chart-container">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default PredmetDetalji;
