import { useState, useEffect } from 'react';
import axios from 'axios';

const useIspiti = (initialUrl) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const token = sessionStorage.getItem('token'); 
                const headers = {
                    'Authorization': `Bearer ${token}`,  
                };
        
                const response = await axios.get(initialUrl, { headers });
                console.log(response.data)
                setData(response.data.ispiti); 
                console.log(response.data.data.ispiti)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        

        fetchData();
    }, [initialUrl]);

    return [data, loading, error,setData];
};

export default useIspiti;
