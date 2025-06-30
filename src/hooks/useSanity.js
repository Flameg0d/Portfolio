import { useEffect, useState } from 'react';
import { createClient } from '@sanity/client'; // Use named export

const client = createClient({ // Use createClient to instantiate the client
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: process.env.REACT_APP_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2021-03-25', // Use a specific API version
});

export const useSanity = (query) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mutate = async () => {
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

  useEffect(() => {
    mutate();
  }, [query]);

  return { data, loading, error, mutate };
};
