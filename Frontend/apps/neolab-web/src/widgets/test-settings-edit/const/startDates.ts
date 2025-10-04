import type { FilterType } from '@/entities/filter';

export const startDates: FilterType[] = [
  { label: 'Сразу после создания', key: 'after' },
  { label: 'Фиксированное', key: 'fixed' },
];
