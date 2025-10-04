import { Tabs, Tab } from '@/shared/ui';
import { useLocation } from 'react-router-dom';
import type { TopbarItemType } from '../model/types';
import { TopbarItem } from './TopbarItem';
import { useMediaQuery, useNavigation } from '@/shared/hooks';

type TopbarProps = {
  links: TopbarItemType[];
};

export const Topbar = ({ links }: TopbarProps) => {
  const isMobile = useMediaQuery({ query: '(max-width: 540px)' });
  const { scrollNavigate } = useNavigation();
  const { pathname } = useLocation();

  const hasEnabledKey = (key: string) => links.find((l) => l.enabledList.includes(key));

  const handleSwitch = (key: string) => {
    if (hasEnabledKey(key)) {
      scrollNavigate(key);
    }
  };

  return (
    <div className="w-full">
      <Tabs
        size="lg"
        isVertical={isMobile}
        color="secondary"
        onSelectionChange={(key) => handleSwitch(key as string)}
        selectedKey={hasEnabledKey(pathname)?.path || 'default'}
        aria-label="Sidebar"
        classNames={{
          tabContent: 'w-full text-[12px]',
          tab: 'px-[13px] min-w-[151px]',
          cursor: 'drop-shadow-base',
          ...(isMobile && {
            tabList: 'w-full',
            base: 'w-full',
          }),
        }}
      >
        <Tab key="default" className="hidden" aria-hidden />
        {links.map(({ path, label }) => (
          <Tab key={path} title={<TopbarItem label={label} />} />
        ))}
      </Tabs>
    </div>
  );
};
