import { useQuery } from '@tanstack/react-query';
import { projectCommentApi } from '../services/projectCommentAPI';

export const useProjectComments = (projectId: string) => {
  return useQuery({
    queryKey: ['project-comments', projectId],
    queryFn: async () => await projectCommentApi.getByProjectId(projectId),
    staleTime: 5 * 1000,
  });
};
