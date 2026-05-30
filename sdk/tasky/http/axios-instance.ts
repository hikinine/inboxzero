import Axios, { type AxiosError, type AxiosRequestConfig } from 'axios';

const getBaseURL = () => {
  try {
    // Vite environment (browser/dev)
    if (typeof import.meta !== 'undefined' && (import.meta as Record<string, unknown>).env) {
      return (import.meta as { env: Record<string, string> }).env['VITE_API_URL'] ?? 'http://localhost:4000';
    }
  } catch {
    // ignore
  }
  return 'http://localhost:4000';
};

export const AXIOS_INSTANCE = Axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  timeout: 30 * 1000,
});

export const axiosInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    cancelToken: source.token,
  }).then(({ data }) => data as T);

  // @ts-ignore
  promise.cancel = () => source.cancel('Query was cancelled');

  return promise;
};

export type ErrorType<Error> = AxiosError<Error>;
