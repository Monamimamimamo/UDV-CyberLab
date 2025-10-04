import { useMutation, useQueryClient } from '@tanstack/react-query';
import { testEditingApi } from '@/entities/test-editing';

export const useEditComplianceQuestion = (testId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['question/compliance'],
    mutationFn: testEditingApi.createComplianceQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test/editing', testId] });
    },
  });
};
