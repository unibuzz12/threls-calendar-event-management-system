import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";

const usePostRequest = (url: string) => {
  const [data, setData] = useState<AxiosResponse>();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<AxiosError>();

  const makePostRequest = async (formData: any) => {
    setLoading(true);

    try {
      const response = await axios.post(url, formData);
      setData(response);
    } catch (error) {
      setErrors(error as AxiosError);
    } finally {
      setLoading(false);
    }
  }

  return {
    data,
    loading,
    errors,
    makePostRequest
  }
}

export default usePostRequest;
