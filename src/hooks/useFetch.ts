import { useState, useEffect } from "react";
import { api } from "../api";

export interface IParams {
  limit?: number;
  skip?: number;
  order?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const useFetch = <T,>(endpoint: string, initialParams?: IParams) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<IParams | undefined>(initialParams);

  const fetchData = async (customParams?: IParams) => {
    setLoading(true);
    try {
      const res = await api.get<T>(endpoint, { params: customParams ?? params });
      setData(res.data);
      if (customParams) setParams(customParams);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialParams) {
      fetchData(initialParams);
    }
  }, [endpoint]);

  return { data, error, loading, refetch: fetchData };
};
