import { useEffect, useState } from 'react';
import { Input, type InputProps } from '@/shared/ui';
import { MdSearch } from 'react-icons/md';

const DELAY = 400;

type SearchInputProps = InputProps & {
  search: string | null;
  setSearch: (search: string | null) => void;
};

export const SearchInput = ({ search, setSearch, ...props }: SearchInputProps) => {
  const [value, setValue] = useState(search ?? '');

  useEffect(() => {
    const handler = setTimeout(() => {
      if (value !== search) {
        setSearch(value);
      }
    }, DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [value, search, setSearch]);

  return (
    <Input
      role="search"
      startContent={<MdSearch className="text-foreground text-[28px]" />}
      size="lg"
      placeholder="Поиск..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      isClearable
      onClear={() => setValue('')}
      {...props}
      classNames={{
        inputWrapper: `bg-search data-[hover=true]:bg-white group-data-[focus=true]:bg-white group-data-[has-value=true]:bg-white ${props.classNames?.inputWrapper}`,
        input: 'text-[14px]',
      }}
    />
  );
};
