import {
  useQuery,
  useSuspenseQuery,
  queryOptions,
} from '@tanstack/react-query';
import { projectApi } from '../services/testAPI';

const createProjectDetailsConfig = (id: string) =>
  queryOptions({
    queryKey: ['projects', id],
    queryFn: async () => await projectApi.getDetailsById(id),
    staleTime: 2000,
  });

export const useSuspenseProjectDetails = (id: string) => {
  return useSuspenseQuery(createProjectDetailsConfig(id));
};

export const useProjectDetails = (id: string) => {
  return useQuery(createProjectDetailsConfig(id));
};
