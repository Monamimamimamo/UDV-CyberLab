/* eslint-disable @typescript-eslint/no-explicit-any */

type SortOptions = { field: string; order: 'asc' | 'desc' };

const defaultOptions = { field: 'createdAt', order: 'desc' };

export const sortingByDate = (
  a: any,
  b: any,
  options?: Partial<SortOptions>
) => {
  const ops = {
    ...defaultOptions,
    ...options,
  };

  const dateA = new Date(a[ops.field]).getTime();
  const dateB = new Date(b[ops.field]).getTime();
  return ops.order === 'desc' ? dateB - dateA : dateA - dateB;
};
