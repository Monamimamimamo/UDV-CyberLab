import type { AccessTokenType } from '@/shared/types';
import { axiosClient } from '@/shared/api';
import type { LoginRequestDTO } from '../../model/dto/LoginRequestDTO';
import type { RegisterRequestDTO } from '../../model/dto/RegisterRequestDTO';
import type { ForgotPasswordRequestDto } from '../../model/dto/ForgotPasswordRequestDto';
import type { ConfirmEmailRequestDto } from '../../model/dto/ConfirmEmailRequestDto';
import type { ResetPasswordRequestDto } from '../../model/dto/ResetPasswordRequestDto';

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

  public async confirmEmail(body: ConfirmEmailRequestDto) {
    return await axiosClient.post('/api/auth/confirmEmail', body);
  }

  public async forgotPassword(body: ForgotPasswordRequestDto) {
    return await axiosClient.post('/api/auth/forgotPassword', body);
  }

  public async resetPassword(body: ResetPasswordRequestDto) {
    return await axiosClient.post('/api/auth/resetPassword', body);
  }
}

export const authApi = new AuthApi();
