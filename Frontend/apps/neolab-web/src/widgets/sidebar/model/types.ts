import type { IconType } from 'react-icons';

export type SidebarItemType = {
  id: number;
  label: string;
  path: string;
  icon?: IconType;
  enabledList: string[];
};
