import { useMutation, useQueryClient } from '@tanstack/react-query';
import { testApi } from '../services/testAPI';

export const useDeleteTest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['test/delete'],
    mutationFn: testApi.deleteTestById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tests'] });
    },
  });
};
