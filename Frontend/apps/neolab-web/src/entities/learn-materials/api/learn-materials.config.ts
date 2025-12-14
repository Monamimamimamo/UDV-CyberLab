import { queryOptions } from '@tanstack/react-query';
import type { GetAllLearnMaterialsParams } from '../models/query-params';
import { learnMaterialsApiService } from './learn-materials-api.service';

export const createLearnMaterialDetailsConfig = (id: string) =>
  queryOptions({
    queryKey: ['learn-materials', id],
    queryFn: async () => await learnMaterialsApiService.getDetailsById(id),
    staleTime: 2000,
  });

export const getLearnMaterialFile = (path: string, id: string) =>
  queryOptions({
    queryKey: ['file/learn-materials', id],
    queryFn: async () => await learnMaterialsApiService.getFile(path),
    staleTime: 60 * 60 * 1000,
  });

export const getLearnMaterialList = ({ sortOrder, search }: GetAllLearnMaterialsParams) =>
  queryOptions({
    queryKey: ['learn-materials', { sortOrder, search }],
    queryFn: async () => await learnMaterialsApiService.getAll({ sortOrder, search }),
    staleTime: 2000,
  });
