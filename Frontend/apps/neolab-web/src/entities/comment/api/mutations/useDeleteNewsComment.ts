import { useMutation, useQueryClient } from '@tanstack/react-query';
import { newsCommentApi } from '../services/newsCommentAPI';

export const useDeleteNewsComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['news-comment/delete'],
    mutationFn: newsCommentApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news-comments'] });
    },
  });
};

