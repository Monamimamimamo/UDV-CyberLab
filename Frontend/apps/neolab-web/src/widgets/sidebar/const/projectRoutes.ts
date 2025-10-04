import { MdOutlineSchool } from 'react-icons/md';
import type { SidebarItemType } from '../model/types';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';

export const projectRoutes: SidebarItemType[] = [
  {
    id: 1,
    label: 'Мои проекты',
    path: '/projects/my',
    icon: MdOutlineSchool,
    enabledList: ['/projects/my'],
  },
  {
    id: 2,
    label: 'Все проекты',
    path: '/projects',
    icon: AiOutlineFundProjectionScreen,
    enabledList: ['/projects'],
  },
];
