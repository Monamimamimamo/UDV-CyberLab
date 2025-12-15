import { useQuery } from '@tanstack/react-query';
import { learnMaterialsCommentApi } from '../services/learnMaterialsCommentAPI';

export const useLearnMaterialsComments = (materialId: string) => {
  return useQuery({
    queryKey: ['learn-materials-comments', materialId],
    queryFn: async () => await learnMaterialsCommentApi.getByMaterialId(materialId),
    staleTime: 5 * 1000,
  });
};
