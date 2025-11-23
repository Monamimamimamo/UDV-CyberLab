import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentApi } from '../services/commentAPI';

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['comment/delete'],
    mutationFn: commentApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};
