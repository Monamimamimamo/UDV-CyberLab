import { useMutation } from '@tanstack/react-query';
import { authApi } from '../services/authAPI';

export const useResetPassword = () => {
  const { mutateAsync, isPending, error } = useMutation({
    mutationKey: ['auth/resetPassword'],
    mutationFn: authApi.resetPassword,
    meta: {
      skipGlobalError: true,
    },
  });

  return { resetPassword: mutateAsync, isPending, error };
};

