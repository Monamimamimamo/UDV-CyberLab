import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentApi } from '../services/commentAPI';

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['comment/create'],
    mutationFn: commentApi.create,
    onSuccess: (data: { cardId: string }) => {
      queryClient.invalidateQueries({ queryKey: ['comments', data.cardId] });
    },
  });
};
