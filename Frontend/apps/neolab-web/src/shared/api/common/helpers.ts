import axios from 'axios';
import { addTokenInterceptor, notAuthorizedInterceptor } from '../interceptors';

export const createAxiosWithInterceptors = (baseURL: string) => {
  const instance = axios.create({ baseURL });
  instance.interceptors.request.use(addTokenInterceptor, Promise.reject);
  instance.interceptors.response.use(res => res, notAuthorizedInterceptor);
  return instance;
};
