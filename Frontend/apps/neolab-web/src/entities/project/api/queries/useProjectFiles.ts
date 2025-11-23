import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { projectApi } from '../services/testAPI';

const createProjectFilesConfig = (id: string) =>
  queryOptions({
    queryKey: ['files', id],
    queryFn: async () => await projectApi.getProjectFiles(id),
    staleTime: 60 * 60 * 1000,
  });

export const useSuspenseProjectFiles = (id: string) => {
  return useSuspenseQuery(createProjectFilesConfig(id));
};

export const useProjectFiles = (id: string) => {
  return useQuery(createProjectFilesConfig(id));
};
