import type { SortingType } from '../model/types';

export const newsDefaultSorting: SortingType[] = [
  { label: 'Новые', key: 'new' },
  { label: 'Старые', key: 'old' },
  { label: 'С высоким рейтингом', key: 'high_rating' },
  { label: 'С низким рейтингом', key: 'low_rating' },
  { label: 'Больше просмотров', key: 'high_views' },
  { label: 'Меньше просмотров', key: 'low_views' },
];

export enum NewsDefaultSorting {
  New = 'new',
  Old = 'old',
  HighRating = 'high_rating',
  LowRating = 'low_rating',
  HighViews = 'high_views',
  LowViews = 'low_views',
}
