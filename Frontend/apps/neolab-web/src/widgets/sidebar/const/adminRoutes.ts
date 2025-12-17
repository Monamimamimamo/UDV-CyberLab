import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import type { SidebarItemType } from '../model/types';
import { FaUsers } from 'react-icons/fa';
import { MdOutlineBook } from 'react-icons/md';
import { IoNewspaperOutline } from 'react-icons/io5';
import { IoBookOutline } from 'react-icons/io5';

export const adminRoutes: SidebarItemType[] = [
  {
    id: 1,
    label: 'Пользователи',
    path: '/admin/users',
    icon: FaUsers,
    enabledList: ['/admin/users', '/admin'],
  },
  {
    id: 2,
    label: 'Витрина проектов',
    path: '/admin/projects',
    icon: AiOutlineFundProjectionScreen,
    enabledList: ['/admin/projects'],
  },
  {
    id: 3,
    label: 'Тесты',
    path: '/admin/tests',
    icon: MdOutlineBook,
    enabledList: ['/admin/tests'],
  },
  {
    id: 4,
    label: 'Новости',
    path: '/admin/news',
    icon: IoNewspaperOutline,
    enabledList: ['/admin/news'],
  },
  {
    id: 5,
    label: 'Учебные материалы',
    path: '/admin/learn-materials',
    icon: IoBookOutline,
    enabledList: ['/admin/learn-materials'],
  },
];
