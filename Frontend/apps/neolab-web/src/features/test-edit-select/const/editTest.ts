import { EditTestNavigation } from '@/features/test-edit-nav';

export const editTestSelect = [
  {
    id: 1,
    label: 'Свои вопросы',
    key: EditTestNavigation.CUSTOM,
  },
  {
    id: 2,
    label: 'Вопросы из базы',
    key: EditTestNavigation.GENERATE,
  },
  {
    id: 3,
    label: 'Генерация нейросетью',
    key: EditTestNavigation.AI_GENERATION,
  },
];
