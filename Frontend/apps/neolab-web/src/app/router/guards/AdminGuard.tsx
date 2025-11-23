import { useAuth, useUserStatus } from '@/entities/user';
import { Navigate, Outlet } from 'react-router-dom';

export const AdminGuard = () => {
  const user = useAuth(state => state.user);
  const { isAdmin } = useUserStatus();

  if (!user) {
    return null;
  }

  if (isAdmin) {
    return <Outlet />;
  }

  // TODO: Редирект на страницу запроса доступа (когда появится функционал)
  return <Navigate to={'/'} replace />;
};
