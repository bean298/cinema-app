import { useEffect, useState } from "react";

// <T>: Generic Type which mean useFetch can work with multiplies data type without hard fix data type

const useFetch = <T>(fecthFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fecthFunction();

      setData(result);
    } catch (err) {
      // @ts-ignore
      // If err was a obj in Error maintain err
      // Else create new Error with msg "An error occurred"
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
