import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/authAPI';
import { useEffect, useState } from 'react';
import type { ErrorResponse } from '@/shared/types';

export const useRegister = () => {
  const [fetchError, setFetchError] = useState<ErrorResponse | null>(null);
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['auth/register'],
    mutationFn: authApi.register,
    onSuccess: () => {
      navigate('/registration/success');
    },
    onError: (error: ErrorResponse) => {
      if (error.status === 400) {
        setFetchError({
          message: 'Пользователь с таким логином или почтой уже существует',
          status: 400,
        });
      } else setFetchError(error);
    },
  });

  useEffect(() => {
    if (fetchError) {
      const timeoutId = setTimeout(() => {
        setFetchError(null);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [fetchError]);

  return { register: mutateAsync, isPending, error: fetchError };
};
