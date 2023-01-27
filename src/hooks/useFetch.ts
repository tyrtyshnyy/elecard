import { useLayoutEffect, useState } from "react";

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | never[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useLayoutEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const result = await response.json();

        if (response.status === 200) {
          setData(result);
        } else {
          setHasError(true);
        }
        setIsLoading(false);
      } catch (err: any) {
        setHasError(true);

        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return { data, setData, isLoading, hasError };
};


export default useFetch;
