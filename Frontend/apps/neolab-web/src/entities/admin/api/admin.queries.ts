import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getUsersList } from './admin.config';
import type { GetUsersParams } from './get-users-params';

export const useSuspenseUsers = (params: GetUsersParams) => {
  const { data } = useSuspenseQuery(getUsersList(params));
  return data;
};

export const useUsers = (params: GetUsersParams) => {
  const { data, ...rest } = useQuery(getUsersList(params));
  return { users: data, ...rest };
};
