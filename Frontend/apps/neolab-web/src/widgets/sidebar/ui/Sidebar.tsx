import { Tabs, Tab } from '@/shared/ui';
import type { SidebarItemType } from '../model/types';
import { useLocation } from 'react-router-dom';
import { SidebarItem } from './SidebarItem';
import { logoutTabData } from '../const/logoutTab';
import { useNavigation } from '@/shared/hooks';
import { useLogoutModal } from '@/features/logout-modal';
import { useAuth } from '@/entities/user';

type SidebarProps = {
  links: SidebarItemType[];
  withLogout?: boolean;
};
// TODO Сайдбар нужно как-то на регулярки переделать и протестить /tests/my/* и /test/manage/* и тд
export const Sidebar = ({ links, withLogout = false }: SidebarProps) => {
  const open = useLogoutModal(state => state.open);
  const isAuthorized = useAuth(state => state.isAuthorized);
  const { scrollNavigate } = useNavigation();
  const { pathname } = useLocation();

  const hasEnabledKey = (key: string) => {
    const element = links.find(l => l.enabledList.includes(key));
    if (element) return element;
    return links.find(l => l.enabledList.filter(el => el === key));
  };

  const handleSwitch = (key: string) => {
    if (key === 'logout') {
      open();
      return;
    }

    if (hasEnabledKey(key)) {
      scrollNavigate(key);
    }
  };

  return (
    <aside>
      <Tabs
        size="lg"
        isVertical
        fullWidth
        onSelectionChange={key => handleSwitch(key as string)}
        selectedKey={hasEnabledKey(pathname)?.path || 'default'}
        className="w-[224px]"
        aria-label="Sidebar"
        classNames={{
          tabContent: 'w-full',
          tab: 'px-[13px]',
          cursor: 'drop-shadow-base',
        }}
      >
        <Tab key="default" className="hidden" aria-hidden />
        {links.map(({ path, label, icon }) => (
          <Tab key={path} title={<SidebarItem icon={icon} label={label} />} />
        ))}
        {withLogout && isAuthorized && (
          <Tab key="logout" title={<SidebarItem {...logoutTabData} />} />
        )}
      </Tabs>
    </aside>
  );
};
