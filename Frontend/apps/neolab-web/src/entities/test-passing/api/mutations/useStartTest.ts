import { useMutation } from '@tanstack/react-query';
import { testPassingApi } from '../services/testPassingAPI';
import { currentTestService } from '@/shared/services';

export const useTestStart = () => {
  return useMutation({
    mutationKey: ['test/start'],
    mutationFn: testPassingApi.startTest,
    onSuccess: response => {
      currentTestService.save(response);
    },
  });
};
