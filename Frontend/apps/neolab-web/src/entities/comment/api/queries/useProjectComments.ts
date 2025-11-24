import { useQuery } from '@tanstack/react-query';
import { commentApi } from '../services/commentAPI';

export const useProjectComments = (projectId: string) => {
  return useQuery({
    queryKey: ['comments', projectId],
    queryFn: async () => await commentApi.getByProjectId(projectId),
    staleTime: 5 * 1000,
  });
};
