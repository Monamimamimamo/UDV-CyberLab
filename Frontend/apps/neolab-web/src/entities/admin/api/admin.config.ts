import { mutationOptions, queryOptions } from '@tanstack/react-query';
import type { GetUsersParams } from './get-users-params';
import { adminApiService } from './admin-api.service';

export const getUsersList = ({ search }: GetUsersParams) =>
  queryOptions({
    queryKey: ['users', { search }],
    queryFn: async () => await adminApiService.getUsers({ search }),
    staleTime: 2000,
  });

export const deleteLearnMaterial = () =>
  mutationOptions({
    mutationKey: ['learn-materials/delete'],
    mutationFn: adminApiService.deleteLearnMaterials,
  });

export const deleteNews = () =>
  mutationOptions({
    mutationKey: ['news/delete'],
    mutationFn: adminApiService.deleteNews,
  });

export const deleteUser = () =>
  mutationOptions({
    mutationKey: ['user/delete'],
    mutationFn: adminApiService.deleteUser,
  });

export const changeUserRole = () =>
  mutationOptions({
    mutationKey: ['user/change-role'],
    mutationFn: adminApiService.changeUserRole,
  });

export const deleteProject = () =>
  mutationOptions({
    mutationKey: ['project/delete'],
    mutationFn: adminApiService.deleteProject,
  });

export const adminConfig = {
  getUsersList,
  deleteLearnMaterial,
  deleteNews,
  deleteUser,
  changeUserRole,
  deleteProject,
};
