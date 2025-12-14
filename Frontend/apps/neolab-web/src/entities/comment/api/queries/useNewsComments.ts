import { useQuery } from '@tanstack/react-query';
import { newsCommentApi } from '../services/newsCommentAPI';

export const useNewsComments = (newsId: string) => {
  return useQuery({
    queryKey: ['news-comments', newsId],
    queryFn: async () => await newsCommentApi.getByNewsId(newsId),
    staleTime: 5 * 1000,
  });
};

