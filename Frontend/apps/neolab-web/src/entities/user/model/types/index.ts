import { UserRole } from '@/shared/types';

export type UserCardType = {
  userName: string;
  email: string;
  img?: string;
  role: UserRole;
};
