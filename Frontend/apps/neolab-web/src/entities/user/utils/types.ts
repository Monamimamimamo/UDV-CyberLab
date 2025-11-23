import { UserRole } from '@/shared/types';

export const isTeacher = (role: UserRole): role is UserRole.TEACHER =>
  role === UserRole.TEACHER;

export const isAdmin = (role: UserRole): role is UserRole.ADMIN =>
  role === UserRole.ADMIN;
