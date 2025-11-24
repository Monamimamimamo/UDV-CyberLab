import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { createNewsDetailsConfig, getNewsFile, getNewsList } from './news.config';
import type { GetAllNewsParams } from '../models/query-params';

export const useSuspenseNewsDetails = (id: string) => {
  return useSuspenseQuery(createNewsDetailsConfig(id));
};

export const useNewsDetails = (id: string) => {
  return useQuery(createNewsDetailsConfig(id));
};

export const useNewsList = ({ sortOrder = 0, search }: GetAllNewsParams) => {
  return useSuspenseQuery(getNewsList({ sortOrder, search }));
};

export const useNewsFileSrc = (path: string, id: string) => {
  return useSuspenseQuery(getNewsFile(path, id));
};
