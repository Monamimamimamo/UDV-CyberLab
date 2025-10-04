import { useAuth } from '@/entities/user';
import { tokenService } from '@/shared/services';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const NoAuthGuard = () => {
  const login = useAuth(state => state.login);
  const isAuthorized = useAuth(state => state.isAuthorized);

  useEffect(() => {
    if (tokenService.hasValue()) {
      login();
    }
  }, [login]);

  if (tokenService.hasValue() || isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
