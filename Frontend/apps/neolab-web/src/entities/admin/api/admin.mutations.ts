import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToast } from '@heroui/react';
import { adminConfig } from './admin.config';

export const useAdminDeleteLearnMaterials = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, ...rest } = useMutation({
    ...adminConfig.deleteLearnMaterial(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learn-materials'] });
      addToast({ color: 'success', title: 'Учебный материал был успешно удален!' });
    },
  });

  return { deleteLearnMaterial: mutateAsync, ...rest };
};

export const useAdminDeleteNews = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, ...rest } = useMutation({
    ...adminConfig.deleteNews(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      addToast({ color: 'success', title: 'Новость была успешно удалена!' });
    },
  });

  return { deleteNews: mutateAsync, ...rest };
};

export const useAdminDeleteUser = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, ...rest } = useMutation({
    ...adminConfig.deleteUser(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      addToast({ color: 'success', title: 'Пользователь был успешно удален!' });
    },
  });

  return { deleteUser: mutateAsync, ...rest };
};

export const useAdminDeleteProject = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, ...rest } = useMutation({
    ...adminConfig.deleteProject(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  return { deleteProject: mutateAsync, ...rest };
};
