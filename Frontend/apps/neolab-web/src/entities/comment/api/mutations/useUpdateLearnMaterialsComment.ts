import { useMutation, useQueryClient } from '@tanstack/react-query';
import { learnMaterialsCommentApi } from '../services/learnMaterialsCommentAPI';

export const useUpdateLearnMaterialsComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['learn-materials-comment/update'],
    mutationFn: learnMaterialsCommentApi.update,
    onSuccess: (data: { cardId: string }) => {
      queryClient.invalidateQueries({ queryKey: ['learn-materials-comments', data.cardId] });
    },
  });
};
