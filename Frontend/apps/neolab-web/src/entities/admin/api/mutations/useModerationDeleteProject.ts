import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../services/adminAPI';

export const useModerationDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['project/delete'],
    mutationFn: adminApi.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
