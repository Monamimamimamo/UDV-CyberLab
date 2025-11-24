import { useMutation, useQueryClient } from '@tanstack/react-query';
import { newsApiService } from './news-api.service';
import { addToast } from '@heroui/react';

export const useCreateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['news/create'],
    mutationFn: newsApiService.create,
    onSuccess: () => {
      addToast({ color: 'success', title: 'Новость создана' });
      queryClient.invalidateQueries({ queryKey: ['news'] });
      queryClient.invalidateQueries({ queryKey: ['my/news'] });
    },
  });
};

export const useUpdateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['news/update'],
    mutationFn: newsApiService.update,
    onSuccess: (id: string) => {
      addToast({ color: 'success', title: 'Новость отредактирована' });
      queryClient.invalidateQueries({ queryKey: ['file', id] });
      queryClient.refetchQueries({ queryKey: ['news', id] });
      queryClient.invalidateQueries({ queryKey: ['files', id] });
    },
  });
};
