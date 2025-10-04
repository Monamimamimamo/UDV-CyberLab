import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '../services/testAPI';

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['project/update'],
    mutationFn: projectApi.update,
    onSuccess: (id: string) => {
      queryClient.invalidateQueries({ queryKey: ['file', id] });
      queryClient.invalidateQueries({ queryKey: ['projects', id] });
      queryClient.invalidateQueries({ queryKey: ['files', id] });
    },
  });
};
