import type { SortingType } from '../model/types';

// Default = 0, // Стандартная сортировка (например, по дате создания)
// ByRating = 1, // По рейтингу (от высокого к низкому)
// ByViews = 2, // По количеству просмотров (от большего к меньшему)
// ByNameAsc = 3, // По имени по возрастанию (A-Z)
// ByNameDesc = 4, // По имени по убыванию (Z-A)
// ByCreationDate = 5 // По имени по убыванию (Z-A)

export const projectSorting: SortingType[] = [
  { label: 'По дате создания', key: 'new' },
  { label: 'С высоким рейтингом', key: 'high_rating' },
  { label: 'Популярные', key: 'high_views' },
  { label: 'По названию', key: 'name' },
];

export enum ProjectSorting {
  new,
  high_rating,
  name,
}
