export enum UserRole {
  STUDENT,
  ADMIN,
  TEACHER,
}

export type UserInfo = {
  userId: string;
  email: string;
  userName: string;
  role: UserRole;
};
