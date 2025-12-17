import { useMutation, useQueryClient } from '@tanstack/react-query';
import { newsRatingApi } from '../services/newsRatingApi';

export const useSetNewsRating = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['news-rating/set'],
    mutationFn: newsRatingApi.setRating,
    onSuccess: (res: { cardId: string }) => {
      console.log(res.cardId);
      queryClient.invalidateQueries({ queryKey: ['news-rating', res.cardId] });
      queryClient.invalidateQueries({ queryKey: ['news', res.cardId] });
    },
  });
};
