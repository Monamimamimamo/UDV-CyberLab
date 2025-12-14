import { useMutation, useQueryClient } from '@tanstack/react-query';
import { newsCommentApi } from '../services/newsCommentAPI';

export const useCreateNewsComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['news-comment/create'],
    mutationFn: newsCommentApi.create,
    onSuccess: (data: { cardId: string }) => {
      queryClient.invalidateQueries({ queryKey: ['news-comments', data.cardId] });
    },
  });
};

