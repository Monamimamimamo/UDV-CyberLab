export interface ResetPasswordRequestDto {
  email: string;
  newPassword: string;
  token: string;
}
