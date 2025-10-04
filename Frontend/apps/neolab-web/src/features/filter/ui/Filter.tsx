/* eslint-disable react-hooks/exhaustive-deps */
import { FilterLabel, type FilterType } from '@/entities/filter';
import { Listbox, ListboxItem, type Selection } from '@heroui/react';
import { useEffect, useState } from 'react';

type FilterProps = {
  listItems: FilterType[];
  onChange: (value: string | null) => void;
  currentValue: string | null;
};

export const Filter = ({ listItems, onChange, currentValue }: FilterProps) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(currentValue);

  const onSelectionChange = (keys: Selection) => {
    const selected = Array.from(keys)[0]?.toString() || null;
    setSelectedKey(selected);
  };

  useEffect(() => {
    onChange(selectedKey ?? null);
  }, [selectedKey]);

  return (
    <Listbox
      selectionMode="single"
      shouldHighlightOnFocus
      selectedKeys={selectedKey ? [selectedKey] : []}
      onSelectionChange={onSelectionChange}
      aria-label="Test filter"
    >
      {listItems.map(({ key, label }) => (
        <ListboxItem
          key={key}
          textValue={label}
          classNames={{
            title: 'text-foreground',
            base: `!outline-none !ring-0
              data-[hover=true]:bg-foreground/10 data-[hover=true]:text-foreground
              data-[selectable=true]:focus:bg-foreground/10 data-[selectable=true]:focus:text-foreground
              data-[selected=true]:focus:bg-background data-[selected=true]:bg-background data-[selected=true]:text-foreground
              `,
          }}
        >
          <FilterLabel label={label} />
        </ListboxItem>
      ))}
    </Listbox>
  );
};
