import { testApi } from '@/entities/test-info';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateTestSettings = (testId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['test-settings/update'],
    mutationFn: testApi.updateTestById,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['test/editing', testId] });
    },
  });
};
