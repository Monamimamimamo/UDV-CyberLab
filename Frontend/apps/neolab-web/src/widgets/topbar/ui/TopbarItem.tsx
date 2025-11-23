import type { TopbarItemType } from '../model/types';

export const TopbarItem = (props: Pick<TopbarItemType, 'label'>) => {
  return <p className="text-[14px]">{props.label}</p>;
};
