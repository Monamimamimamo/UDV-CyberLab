import { testApi } from '@/entities/test-info';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateTestTitle = (testId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['test-title/update'],
    mutationFn: testApi.updateTestById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tests'] });
      queryClient.refetchQueries({ queryKey: ['test/editing', testId] });
    },
  });
};
