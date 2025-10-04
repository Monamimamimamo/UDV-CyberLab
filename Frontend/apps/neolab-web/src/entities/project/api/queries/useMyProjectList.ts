import { useSuspenseQuery } from '@tanstack/react-query';
import { projectApi } from '../services/testAPI';

export const useMyProjectList = () => {
  return useSuspenseQuery({
    queryKey: ['my/projects'],
    queryFn: projectApi.getAllMy,
    staleTime: 2000,
    refetchInterval: 5000,
  });
};
