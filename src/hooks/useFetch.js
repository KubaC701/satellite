import { useEffect, useState } from 'react';

export default (url, { isBlob } = {}, dependencies = []) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const res = await fetch(url);
        if (!res.ok) {
          const { msg } = await res.json();
          console.log(msg);
          throw new Error(msg);
        }
        if (isBlob) {
          const blob = await res.blob();
          setData(URL.createObjectURL(blob));
        } else {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, dependencies);
  return [data, isLoading, isError];
};
