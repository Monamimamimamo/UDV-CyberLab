import { useAuth, useSessionTimeout } from '@/entities/user';
import { tokenService } from '@/shared/services';
import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';

export const AuthGuard = () => {
  const login = useAuth(state => state.login);
  const isAuthorized = useAuth(state => state.isAuthorized);
  const logout = useAuth(state => state.logout);
  const navigate = useNavigate();
  const location = useLocation();

  useSessionTimeout({
    expirationTime: tokenService.get()?.expiration,
    onExpire: () => {
      console.warn('Сессия окончена!');
      tokenService.destroy();
      logout();
      navigate(`/login?redirect_path=${location.pathname}`);
    },
  });

  useEffect(() => {
    if (tokenService.hasValue()) {
      login();
    }
  }, [login]);

  if (tokenService.hasValue() || isAuthorized) {
    return <Outlet />;
  }

  return <Navigate to={`/login?redirect_path=${location.pathname}`} replace />;
};
