import { AxiosClient } from './axios-client';
import { config } from './config';

export const axiosClient = AxiosClient.getInstance(config.BACKEND_URL);

export const fileConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};
