import React, { useEffect } from 'react';
import axios from 'axios';

const DataRes = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data');
        console.log(response.data); // Log the data in the console
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return <div>Data Fetcher Component</div>;
};

export default DataRes;
