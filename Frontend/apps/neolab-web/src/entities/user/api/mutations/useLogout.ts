import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { tokenService } from '@/shared/services';
import { useAuth } from '../../model/store';
import { authApi } from '../services/authAPI';

export const useLogout = () => {
  const navigate = useNavigate();
  const logout = useAuth(state => state.logout);

  const { mutateAsync, isPending, error } = useMutation({
    mutationKey: ['auth/logout'],
    mutationFn: authApi.logout,
    onSuccess: () => {
      logout();
      tokenService.destroy();
      navigate('/login');
    },
  });

  return { login: mutateAsync, isPending, error };
};
