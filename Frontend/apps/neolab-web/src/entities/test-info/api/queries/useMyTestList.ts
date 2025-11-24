import { useSuspenseQuery } from '@tanstack/react-query';
import { testApi } from '../services/testAPI';

export const useMyTestList = () => {
  return useSuspenseQuery({
    queryKey: ['tests', { my: true }],
    queryFn: testApi.getMyTests,
    staleTime: 2000,
  });
};
