import { useState } from "react";
import { api } from "../api";

interface IParams {
  limit: number;
  skip?: number;
  order?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const useFetch = (endpoint: string, params?: IParams) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (overrideParams?: IParams) => {
    setLoading(true);
    try {
      const res = await api.get(endpoint, {
        params: { ...params, ...overrideParams },
      });
      setData(res.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, refetch: fetchData };
};
