import { useSuspenseQuery } from '@tanstack/react-query';
import { userApi } from '../services/userAPI';
import { useEffect } from 'react';
import { useAuth } from '../../model/store';

export const useProfile = () => {
  const setUser = useAuth(state => state.setUser);

  const { data, isPending, isSuccess } = useSuspenseQuery({
    queryKey: ['auth/profile'],
    queryFn: userApi.getProfile,
  });

  useEffect(() => {
    if (isSuccess) {
      setUser(data);
    }
  }, [data, isSuccess, setUser]);

  return { isPending, data };
};
