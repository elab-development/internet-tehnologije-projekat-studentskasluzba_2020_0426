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
                const response = await axios.get(initialUrl);
                setData(response.data.data);  
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
