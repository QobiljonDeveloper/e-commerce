import { useState } from "react";
import { api } from "../api";

export interface IParams {
  limit?: number;
  skip?: number;
  order?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const useFetch = <T,>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (params?: IParams) => {
    setLoading(true);
    try {
      const res = await api.get<T>(endpoint, { params });
      setData(res.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, refetch: fetchData };
};
