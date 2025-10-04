import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentApi } from '../services/commentAPI';

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['comment/update'],
    mutationFn: commentApi.update,
    onSuccess: (data: { projectId: string }) => {
      queryClient.invalidateQueries({ queryKey: ['comments', data.projectId] });
    },
  });
};
