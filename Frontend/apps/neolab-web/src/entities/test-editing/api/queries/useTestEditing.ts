import { useSuspenseQuery } from '@tanstack/react-query';
import { testEditingApi } from '../services/testEditingAPI';

export const useTestEditing = (id: string) => {
  return useSuspenseQuery({
    queryKey: ['test/editing', id],
    queryFn: async () => await testEditingApi.getTestForEditingById(id),
  });
};
