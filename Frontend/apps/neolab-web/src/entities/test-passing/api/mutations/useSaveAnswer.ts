import { useMutation, useQueryClient } from '@tanstack/react-query';
import { testPassingApi } from '../services/testPassingAPI';

export const useSaveAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['test/answer'],
    mutationFn: testPassingApi.saveAnswer,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['test/savedAnswers'] });
    },
  });
};
