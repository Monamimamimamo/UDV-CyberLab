import { useSuspenseQuery } from '@tanstack/react-query';
import { projectApi } from '../services/testAPI';

export const useFileSrc = (path: string, id: string) => {
  return useSuspenseQuery({
    queryKey: ['file', id],
    queryFn: async () => await projectApi.getFile(path),
    staleTime: 60 * 60 * 1000,
  });
};
