import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import type { GetAllLearnMaterialsParams } from '../models/query-params';
import {
    createLearnMaterialDetailsConfig,
    getLearnMaterialFile,
    getLearnMaterialList,
} from './learn-materials.config';

export const useSuspenseLearnMaterialDetails = (id: string) => {
  return useSuspenseQuery(createLearnMaterialDetailsConfig(id));
};

export const useLearnMaterialDetails = (id: string) => {
  return useQuery(createLearnMaterialDetailsConfig(id));
};

export const useLearnMaterialList = ({ sortOrder = 0, search }: GetAllLearnMaterialsParams) => {
  return useSuspenseQuery(getLearnMaterialList({ sortOrder, search }));
};

export const useLearnMaterialFileSrc = (path: string, id: string) => {
  return useQuery(getLearnMaterialFile(path, id));
};

export const useLearnMaterialSuspenseFileSrc = (path: string, id: string) => {
  return useSuspenseQuery(getLearnMaterialFile(path, id));
};
