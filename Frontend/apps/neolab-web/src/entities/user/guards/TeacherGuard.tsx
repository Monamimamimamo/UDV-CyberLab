import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, useUserStatus } from '@/entities/user';

type TeacherGuardProps = {
  redirectPath: string;
};

export const TeacherGuard = ({ redirectPath }: TeacherGuardProps) => {
  const user = useAuth(state => state.user);
  const { isTeacher } = useUserStatus();

  if (!user) {
    return null;
  }

  if (isTeacher) {
    return <Outlet />;
  }

  return <Navigate to={redirectPath} />;
};
