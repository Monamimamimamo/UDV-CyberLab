import { useMutation } from '@tanstack/react-query';
import { authApi } from '../services/authAPI';

export const useConfirmEmail = () => {
  const { mutateAsync, isPending, error } = useMutation({
    mutationKey: ['auth/confirmEmail'],
    mutationFn: authApi.confirmEmail,
  });

  return { confirmEmail: mutateAsync, isPending, error };
};

