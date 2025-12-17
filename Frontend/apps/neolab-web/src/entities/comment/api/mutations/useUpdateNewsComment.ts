import { useMutation, useQueryClient } from '@tanstack/react-query';
import { newsCommentApi } from '../services/newsCommentAPI';

export const useUpdateNewsComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['news-comment/update'],
    mutationFn: newsCommentApi.update,
    onSuccess: (data: { cardId: string }) => {
      queryClient.invalidateQueries({ queryKey: ['news-comments', data.cardId] });
    },
  });
};

