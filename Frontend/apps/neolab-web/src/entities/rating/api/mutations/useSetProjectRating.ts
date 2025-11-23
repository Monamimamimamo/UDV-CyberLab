import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ratingApi } from '../services/ratingApi';

export const useSetProjectRating = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['rating/set'],
    mutationFn: ratingApi.setRating,
    onSuccess: (res: { projectId: string }) => {
      queryClient.invalidateQueries({ queryKey: ['rating', res.projectId] });
      queryClient.invalidateQueries({ queryKey: ['projects', res.projectId] });
    },
  });
};
