import { UserRole } from '@/shared/types';

export const getRoleName = (role: UserRole) =>
  ({
    [UserRole.STUDENT]: 'Студент',
    [UserRole.ADMIN]: 'Администратор',
    [UserRole.TEACHER]: 'Преподаватель',
  })[role];
