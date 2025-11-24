import { queryOptions } from '@tanstack/react-query';
import { newsApiService } from './news-api.service';
import type { GetAllNewsParams } from '../models/query-params';

export const createNewsDetailsConfig = (id: string) =>
  queryOptions({
    queryKey: ['news', id],
    queryFn: async () => await newsApiService.getDetailsById(id),
    staleTime: 2000,
  });

export const getNewsFile = (path: string, id: string) =>
  queryOptions({
    queryKey: ['file/news', id],
    queryFn: async () => await newsApiService.getFile(path),
    staleTime: 60 * 60 * 1000,
  });

export const getNewsList = ({ sortOrder, search }: GetAllNewsParams) =>
  queryOptions({
    queryKey: ['news', { sortOrder, search }],
    queryFn: async () => await newsApiService.getAll({ sortOrder, search }),
    staleTime: 2000,
  });
