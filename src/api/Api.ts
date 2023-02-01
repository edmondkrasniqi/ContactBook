import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export interface AxiosRequestOptions<D> extends AxiosRequestConfig<D> {
  excludeAuthentication?: boolean;
  
}

export async function apiRequest<D = {}, R = unknown>({
  url,
  method,
  data,
  headers,
  params,
}: AxiosRequestOptions<D>) {
  return await Axios.request<D, AxiosResponse<R>>({
    url: `${import.meta.env.VITE_APP_API_URL}/${url}`,
    method,
    data,
    headers,
    params,
  });
}
