import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IspitRed from './IspitRed';
import './Ispiti.css';

function Ispiti() {
  const [ispiti, setIspiti] = useState([]);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    const fetchIspiti = async () => {
      const authId = sessionStorage.getItem('auth_id');
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/ispiti', {
          params: { 
            auth_id: authId,
          },
        
        });
        console.log(response.data.data)
        setIspiti(response.data.data);
        setPagination({
          prev: response.data.prev_page_url,
          next: response.data.next_page_url,
        });
      } catch (error) {
        console.error('Error fetching ispiti', error);
      }
    };

    fetchIspiti();
  }, []);

  return (
    <div className="ispiti-container">
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
          {ispiti.map((ispit) => (
            <IspitRed key={ispit.id} ispit={ispit} />
          ))}
        </tbody>
      </table>
     
    </div>
  );
}

export default Ispiti;
