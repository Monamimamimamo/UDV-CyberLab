import { useMutation, useQueryClient } from '@tanstack/react-query';
import { learnMaterialsCommentApi } from '../services/learnMaterialsCommentAPI';

export const useCreateLearnMaterialsComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['learn-materials-comment/create'],
    mutationFn: learnMaterialsCommentApi.create,
    onSuccess: (data: { cardId: string }) => {
      queryClient.invalidateQueries({ queryKey: ['learn-materials-comments', data.cardId] });
    },
  });
};
