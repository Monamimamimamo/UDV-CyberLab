import { useQuery } from '@tanstack/react-query';
import { projectRatingApi } from '../services/projectRatingApi';

export const useUserProjectRating = (projectId: string) => {
  return useQuery({
    queryKey: ['projects-rating', projectId],
    queryFn: async () => await projectRatingApi.getUserRating(projectId),
    staleTime: 60 * 1000,
  });
};
