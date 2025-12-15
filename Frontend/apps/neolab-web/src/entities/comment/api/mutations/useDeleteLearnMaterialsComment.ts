import { useMutation, useQueryClient } from '@tanstack/react-query';
import { learnMaterialsCommentApi } from '../services/learnMaterialsCommentAPI';

export const useDeleteLearnMaterialsComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['learn-materials-comment/delete'],
    mutationFn: learnMaterialsCommentApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learn-materials-comments'] });
    },
  });
};
