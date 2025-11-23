import type { SortingType } from '../model/types';

// TODO?
// export const projectSorting: SortingType[] = [
//   { label: 'Новинки', key: 'new' },
//   { label: 'Популярные', key: 'popular' },
//   { label: 'Непопулярные', key: 'unpopular' },
//   { label: 'С высоким рейтингом', key: 'high_rating' },
//   { label: 'С низким рейтингом', key: 'low_rating' },
// ];

export const projectSorting: SortingType[] = [
  { label: 'По дате создания', key: 'new' },
  { label: 'С высоким рейтингом', key: 'high_rating' },
  { label: 'Популярные', key: 'high_views' },
  { label: 'По названию', key: 'name' },
];

export enum ProjectSorting {
  new,
  high_rating,
  high_views,
  name,
}
