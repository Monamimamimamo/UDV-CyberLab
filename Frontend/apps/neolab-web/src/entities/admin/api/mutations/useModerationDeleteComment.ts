import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../services/adminAPI';

export const useModerationDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['comment/delete'],
    mutationFn: adminApi.deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};
