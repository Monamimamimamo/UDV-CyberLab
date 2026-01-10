import { useSuspenseQuery } from '@tanstack/react-query';
import { projectApi } from '../services/projectAPI';

export const useProjectList = ({
  sortOrder = 0,
  search,
}: {
  sortOrder?: number;
  search?: string;
}) => {
  return useSuspenseQuery({
    queryKey: ['projects', { sortOrder, search }],
    queryFn: async () => await projectApi.getAll({ sortOrder, search }),
    staleTime: 2000,
  });
};
