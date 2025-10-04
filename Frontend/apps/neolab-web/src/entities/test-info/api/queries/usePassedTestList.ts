import { useSuspenseQuery } from '@tanstack/react-query';
import { testApi } from '../services/testAPI';

export const usePassedTestList = () => {
  return useSuspenseQuery({
    queryKey: ['tests', { passed: true }],
    queryFn: testApi.getPassedTests,
    staleTime: 2000,
    refetchInterval: 5000,
  });
};
