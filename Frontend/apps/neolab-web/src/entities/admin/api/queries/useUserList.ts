import { useSuspenseQuery } from '@tanstack/react-query';
import { adminApi } from '../services/adminAPI';

export const useUserList = ({ search }: { search?: string }) => {
  return useSuspenseQuery({
    queryKey: ['users', { search }],
    queryFn: async () => await adminApi.getUsers({ search }),
    staleTime: 2000,
    refetchInterval: 5000,
  });
};
