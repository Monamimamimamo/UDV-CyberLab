import { useMutation, useQueryClient } from '@tanstack/react-query';
import { testEditingApi } from '@/entities/test-editing';

export const useDeleteQuestion = (testId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['question/delete'],
    mutationFn: testEditingApi.deleteQuestionById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test/editing', testId] });
    },
  });
};
