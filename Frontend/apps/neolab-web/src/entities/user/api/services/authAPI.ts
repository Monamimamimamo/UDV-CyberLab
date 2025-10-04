import type { AccessTokenType } from '@/shared/types';
import { axiosClient } from '@/shared/api';
import type { LoginRequestDTO } from '../../model/dto/LoginRequestDTO';
import type { RegisterRequestDTO } from '../../model/dto/RegisterRequestDTO';

class AuthApi {
  public async login(body: LoginRequestDTO): Promise<AccessTokenType> {
    return await axiosClient.post<LoginRequestDTO, AccessTokenType>('/api/auth/login', body);
  }

  public async register(body: RegisterRequestDTO) {
    return await axiosClient.post<RegisterRequestDTO, void>('/api/auth/register', body);
  }

  public async logout() {
    return await axiosClient.post('/api/auth/logout', {});
  }
}

export const authApi = new AuthApi();
