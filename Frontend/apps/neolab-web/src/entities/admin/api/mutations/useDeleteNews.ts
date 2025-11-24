import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../services/adminAPI';
import { addToast } from '@heroui/react';

export const useDeleteNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['news/delete'],
    mutationFn: adminApi.deleteNews,
    onSuccess: () => {
      addToast({ color: 'success', title: 'Новость удалена' });
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });
};
