import { useQuery } from '@tanstack/react-query';
import { newsRatingApi } from '../services/newsRatingApi';

export const useUserNewsRating = (newsId: string) => {
  return useQuery({
    queryKey: ['news-rating', newsId],
    queryFn: async () => await newsRatingApi.getUserRating(newsId),
    staleTime: 60 * 1000,
  });
};

