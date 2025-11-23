import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectRatingApi } from '../services/projectRatingApi';

export const useSetProjectRating = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['rating/set'],
    mutationFn: projectRatingApi.setRating,
    onSuccess: (res: { projectId: string }) => {
      queryClient.invalidateQueries({ queryKey: ['rating', res.projectId] });
      queryClient.invalidateQueries({ queryKey: ['projects', res.projectId] });
    },
  });
};
