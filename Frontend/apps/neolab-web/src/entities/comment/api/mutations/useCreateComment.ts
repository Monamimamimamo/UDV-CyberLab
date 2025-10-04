import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentApi } from '../services/commentAPI';

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['comment/create'],
    mutationFn: commentApi.create,
    onSuccess: (data: { projectId: string }) => {
      queryClient.invalidateQueries({ queryKey: ['comments', data.projectId] });
    },
  });
};
