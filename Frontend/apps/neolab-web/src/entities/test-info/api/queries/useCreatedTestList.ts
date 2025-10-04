import { useSuspenseQuery } from '@tanstack/react-query';
import { testApi } from '../services/testAPI';

export const useCreatedTestList = () => {
  return useSuspenseQuery({
    queryKey: ['tests', { created: true }],
    queryFn: testApi.getCreatedTests,
    staleTime: 2000,
  });
};
