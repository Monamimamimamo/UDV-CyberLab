import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectCommentApi } from '../services/projectCommentAPI';

export const useCreateProjectComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['project-comment/create'],
    mutationFn: projectCommentApi.create,
    onSuccess: (data: { cardId: string }) => {
      queryClient.invalidateQueries({ queryKey: ['project-comments', data.cardId] });
    },
  });
};
