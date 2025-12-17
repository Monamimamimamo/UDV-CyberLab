import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectRatingApi } from '../services/projectRatingApi';

export const useSetProjectRating = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['projects-rating/set'],
    mutationFn: projectRatingApi.setRating,
    onSuccess: (res: { cardId: string }) => {
      queryClient.invalidateQueries({ queryKey: ['projects-rating', res.cardId] });
      queryClient.invalidateQueries({ queryKey: ['projects', res.cardId] });
    },
  });
};
