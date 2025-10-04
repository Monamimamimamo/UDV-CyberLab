import type { FilterType } from '@/entities/filter';

export const endDates: FilterType[] = [
  { label: 'Не ограничено', key: 'infinity' },
  { label: 'Фиксированное', key: 'fixed' },
];
