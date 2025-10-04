import type { FilterType } from '../model/types';

export const FilterLabel = ({ label }: Pick<FilterType, 'label'>) => {
  return <div>{label}</div>;
};
