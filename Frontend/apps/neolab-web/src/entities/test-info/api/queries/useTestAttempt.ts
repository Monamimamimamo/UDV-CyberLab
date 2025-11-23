import { useSuspenseQuery } from '@tanstack/react-query';
import { testApi } from '../services/testAPI';

export const useTestAttempt = (id: string) => {
  return useSuspenseQuery({
    queryKey: ['test/attempt', id],
    queryFn: async () => await testApi.getUserTestById(id),
  });
};
