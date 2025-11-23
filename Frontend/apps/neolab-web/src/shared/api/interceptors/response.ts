import { AxiosError } from 'axios';
import { publicBackendUrls } from '../common/urls';
import { tokenService } from '@/shared/services';
import { useAuth } from '@/entities/user';

export const notAuthorizedInterceptor = async (error: AxiosError) => {
  if (
    error.config &&
    error.response &&
    error.response.status === 401 &&
    !publicBackendUrls.has(error.config.url as string)
  ) {
    tokenService.destroy();
    useAuth.getState().logout();
  }

  return Promise.reject(error);
};
