import { useMutation, useQueryClient } from '@tanstack/react-query';
import { testPassingApi } from '../services/testPassingAPI';
import { currentTestService } from '@/shared/services';

export const useTestFinish = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['test/finish'],
    mutationFn: testPassingApi.finishTest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test/result'] });
      queryClient.invalidateQueries({ queryKey: ['test/passing'] });
      currentTestService.destroy();
    },
  });
};
