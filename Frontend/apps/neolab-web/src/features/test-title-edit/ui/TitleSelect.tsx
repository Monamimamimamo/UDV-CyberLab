import { Select, SelectItem, type SelectProps } from '@/shared/ui';
import type { FilterType } from '@/entities/filter';
import { memo } from 'react';

const selectClassNames = {
  itemClasses: {
    base: 'data-[hover=true]:bg-controls data-[selectable=true]:focus:text-foreground data-[hover=true]:text-foreground data-[selectable=true]:focus:bg-controls',
  },
};

type TitleSelectProps = Omit<SelectProps, 'children'> & {
  value: string;
  items: FilterType[];
  handleDataChange: (value: string) => void;
};

export const TitleSelect = memo(
  ({ value, handleDataChange, items, ...props }: TitleSelectProps) => {
    return (
      <Select
        color="white"
        size="sm"
        listboxProps={selectClassNames}
        popoverProps={{
          placement: 'bottom-end',
        }}
        selectedKeys={[value]}
        onChange={e => handleDataChange(e.target.value)}
        className="sm:max-w-[213px] w-full"
        classNames={{
          trigger: 'h-[40px] min-h-8 px-3',
          value: 'text-[13px] text-foreground/50',
          mainWrapper: 'h-[40px]',
        }}
        {...props}
      >
        {items.map(({ label, key }) => (
          <SelectItem key={key}>{label}</SelectItem>
        ))}
      </Select>
    );
  }
);
