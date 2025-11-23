import type { TopbarItemType } from '../model/types';

export const myTestRoutes: TopbarItemType[] = [
  {
    id: 1,
    label: 'Назначенные мне',
    path: '/tests/my',
    enabledList: ['/tests/my'],
  },
  {
    id: 2,
    label: 'Пройденные',
    path: '/tests/my/passed',
    enabledList: ['/tests/my/passed'],
  },
];

export const myTestTeacherRoutes: TopbarItemType[] = [
  ...myTestRoutes,
  {
    id: 3,
    label: 'Созданные мной',
    path: '/tests/my/created',
    enabledList: ['/tests/my/created'],
  },
];
