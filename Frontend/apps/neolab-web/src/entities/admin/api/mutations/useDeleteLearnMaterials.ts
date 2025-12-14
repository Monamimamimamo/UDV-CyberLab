import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../services/adminAPI';
import { addToast } from '@heroui/react';

export const useDeleteLearnMaterials = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['learn-materials/delete'],
    mutationFn: adminApi.deleteLearnMaterials,
    onSuccess: () => {
      addToast({ color: 'success', title: 'Учебный материал удален' });
      queryClient.invalidateQueries({ queryKey: ['learn-materials'] });
    },
  });
};
