import type { SidebarItemType } from '../model/types';

export const SidebarItem = (props: Pick<SidebarItemType, 'icon' | 'label'>) => {
  return (
    <div className="flex flex-row gap-2">
      {props.icon && <props.icon className="text-[24px]" />}
      <p className="text-[14px]">{props.label}</p>
    </div>
  );
};
