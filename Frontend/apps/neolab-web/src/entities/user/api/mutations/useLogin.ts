import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { tokenService } from '@/shared/services';
import type { AccessTokenType, ErrorResponse } from '@/shared/types';
import { useAuth } from '../../model/store';
import { authApi } from '../services/authAPI';
import { useEffect, useState } from 'react';
import { getRedirectPath } from '@/shared/common/utils';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const [fetchError, setFetchError] = useState<ErrorResponse | null>(null);
  const navigate = useNavigate();
  const login = useAuth((state) => state.login);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['auth/login'],
    mutationFn: authApi.login,
    meta: {
      skipGlobalError: true,
    },
    onError: (error: ErrorResponse) => {
      if (error.status === 401) {
        setFetchError({
          message: 'Неправильный логин или пароль',
          status: 401,
        });
      } else setFetchError(error);
    },
    onSuccess: (response: AccessTokenType) => {
      queryClient.refetchQueries({ queryKey: ['auth/profile'] });
      tokenService.save(response);
      login();
      const redirectPath = getRedirectPath();
      setTimeout(() => navigate(redirectPath), 10);
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

  return {
    login: mutateAsync,
    isPending,
    error: fetchError,
  };
};
