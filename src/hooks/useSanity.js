import { useEffect, useState } from 'react';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: process.env.REACT_APP_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2021-03-25',
});

export const useSanity = (query) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await client.fetch(query);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Mutate function to update the local state
  const mutate = (newData) => {
    setData(prevData => [newData, ...prevData]); // Add new data to the beginning of the array
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  return { data, loading, error, mutate, fetchData };
};
