import { axiosClient } from '@/shared/api';
import type { IProfile } from '@/shared/api/dto';
import { tokenService } from '@/shared/services';
import { AxiosError } from 'axios';

class UserApi {
  public async getProfile(): Promise<IProfile> {
    try {
      return await axiosClient.get<IProfile>('/api/user/user');
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 404) {
        tokenService.destroy();
      }
      throw error;
    }
  }
}

export const userApi = new UserApi();
