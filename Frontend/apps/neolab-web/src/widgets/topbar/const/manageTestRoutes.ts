import type { TopbarItemType } from '../model/types';

export const manageTestRoutes: TopbarItemType[] = [
  {
    id: 1,
    label: 'Содержание теста',
    path: '/tests/manage/:id/edit/custom',
    enabledList: [
      '/tests/manage/:id/edit/custom',
      '/tests/manage/:id/edit/generate',
      '/tests/manage/:id/edit/ai',
    ],
  },
  {
    id: 2,
    label: 'Настройки',
    path: '/tests/manage/:id/settings',
    enabledList: ['/tests/manage/:id/settings'],
  },
  {
    id: 3,
    label: 'Предпросмотр',
    path: '/tests/manage/:id/preview',
    enabledList: ['/tests/manage/:id/preview'],
  },
];
