import { useQuery } from '@tanstack/react-query';
import { ratingApi } from '../services/ratingApi';

export const useUserProjectRating = (projectId: string) => {
  return useQuery({
    queryKey: ['rating', projectId],
    queryFn: async () => await ratingApi.getUserRating(projectId),
    staleTime: 60 * 1000,
  });
};
