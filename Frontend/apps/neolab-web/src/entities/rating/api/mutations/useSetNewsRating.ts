import { useMutation, useQueryClient } from '@tanstack/react-query';
import { newsRatingApi } from '../services/newsRatingApi';

export const useSetNewsRating = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['news-rating/set'],
    mutationFn: newsRatingApi.setRating,
    onSuccess: (res: { projectId: string }) => {
      queryClient.invalidateQueries({ queryKey: ['news-rating', res.projectId] });
      queryClient.invalidateQueries({ queryKey: ['news', res.projectId] });
    },
  });
};

