import { Tabs, Tab } from '@/shared/ui';
import { useRoleSwitcher } from '../model/store';
import { UserRole } from '@/shared/types';

export const StatusSwitcher = () => {
  const { userRole, setUserRole } = useRoleSwitcher();

  return (
    <Tabs
      size="lg"
      aria-label="User status"
      defaultSelectedKey={userRole}
      onSelectionChange={key => setUserRole(key as typeof userRole)}
      classNames={{
        tab: 'py-[22px] md:px-10 mobile:px-8 px-6',
        tabList: 'bg-controls',
      }}
    >
      <Tab className="w-1/2" key={UserRole.STUDENT} title="Студент" />
      <Tab className="w-1/2" key={UserRole.TEACHER} title="Преподаватель" />
    </Tabs>
  );
};
