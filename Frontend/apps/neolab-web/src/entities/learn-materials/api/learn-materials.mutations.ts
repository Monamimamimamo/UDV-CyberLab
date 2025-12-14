import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/react';
import { learnMaterialsApiService } from './learn-materials-api.service';

export const useCreateLearnMaterials = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['learn-materials/create'],
    mutationFn: learnMaterialsApiService.create,
    onSuccess: () => {
      addToast({ color: 'success', title: 'Учебный материал создан' });
      queryClient.invalidateQueries({ queryKey: ['learn-materials'] });
    },
  });
};

export const useUpdateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['learn-materials/update'],
    mutationFn: learnMaterialsApiService.update,
    onSuccess: (id: string) => {
      addToast({ color: 'success', title: 'Учебный материал отредактирован' });
      queryClient.invalidateQueries({ queryKey: ['file/learn-material', id] });
      queryClient.refetchQueries({ queryKey: ['learn-materials', id] });
    },
  });
};
