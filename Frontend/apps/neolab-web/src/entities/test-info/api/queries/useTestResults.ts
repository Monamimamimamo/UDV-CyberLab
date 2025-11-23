import { useSuspenseQuery } from '@tanstack/react-query';
import { testApi } from '../services/testAPI';

export const useTestResults = (id: string) => {
  return useSuspenseQuery({
    queryKey: ['test/result', id],
    queryFn: async () => await testApi.getTestResultsById(id),
    staleTime: 60 * 1000,
  });
};
