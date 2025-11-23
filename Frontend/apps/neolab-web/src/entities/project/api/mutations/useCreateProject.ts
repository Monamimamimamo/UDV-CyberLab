import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '../services/testAPI';

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['project/create'],
    mutationFn: projectApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['my/projects'] });
    },
  });
};
