import { useSuspenseQuery } from '@tanstack/react-query';
import { testApi } from '../services/testAPI';

export const useTestStatistics = (id: string) => {
  return useSuspenseQuery({
    queryKey: ['test/statistics', id],
    queryFn: async () => await testApi.getTestStatisticsById(id),
  });
};
