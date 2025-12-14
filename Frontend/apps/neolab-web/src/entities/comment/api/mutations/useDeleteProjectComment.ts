import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectCommentApi } from '../services/projectCommentAPI';

export const useDeleteProjectComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['project-comment/delete'],
    mutationFn: projectCommentApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-comments'] });
    },
  });
};
