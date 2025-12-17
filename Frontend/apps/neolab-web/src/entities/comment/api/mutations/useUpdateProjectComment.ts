import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectCommentApi } from '../services/projectCommentAPI';

export const useUpdateProjectComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['project-comment/update'],
    mutationFn: projectCommentApi.update,
    onSuccess: (data: { cardId: string }) => {
      queryClient.invalidateQueries({ queryKey: ['project-comments', data.cardId] });
    },
  });
};
