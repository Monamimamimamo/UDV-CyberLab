import { useMutation, useQueryClient } from '@tanstack/react-query';
import { testEditingApi } from '@/entities/test-editing';

export const useUpdateQuestion = (testId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['question/update'],
    mutationFn: testEditingApi.updateQuestionById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test/editing', testId] });
    },
  });
};
