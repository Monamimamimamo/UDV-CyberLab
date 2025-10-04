import { useQuery } from '@tanstack/react-query';
import { testApi } from '../services/testAPI';

export const useTestDetails = (id: string) => {
  return useQuery({
    queryKey: ['test/details', id],
    queryFn: async () => await testApi.getTestDetailsById(id),
  });
};
