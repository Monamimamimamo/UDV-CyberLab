import type { InternalAxiosRequestConfig } from 'axios';
import { publicBackendUrls } from '../common/urls';
import { tokenService } from '@/shared/services';

export const addTokenInterceptor = (config: InternalAxiosRequestConfig) => {
  if (!publicBackendUrls.has(config.url as string)) {
    const token = tokenService.get()?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
};
