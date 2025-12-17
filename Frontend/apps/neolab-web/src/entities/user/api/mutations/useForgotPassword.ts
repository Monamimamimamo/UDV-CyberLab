import { useMutation } from '@tanstack/react-query';
import { authApi } from '../services/authAPI';

export const useForgotPassword = () => {
  const { mutateAsync, isPending, error } = useMutation({
    mutationKey: ['auth/forgotPassword'],
    mutationFn: authApi.forgotPassword,
  });

  return { forgotPassword: mutateAsync, isPending, error };
};

