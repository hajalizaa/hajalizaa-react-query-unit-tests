import axios, { AxiosError } from 'axios';
import config from './index';

export interface IError {
  error: string;
}

const axiosHandler = axios.create({
  baseURL: config.api.url
});

axiosHandler.interceptors.response.use(
  undefined,
  (error: AxiosError<IError>) => {
    return Promise.reject<IError>(error);
  }
);

export default axiosHandler;
