import { useMediaQuery } from '@/shared/hooks';
import { type InputProps, SearchInput, StickyElement } from '@/shared/ui';
import { useQueryState } from 'nuqs';

export const StickySearch = (props: InputProps) => {
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
  const [search, setSearch] = useQueryState('search', { defaultValue: '' });

  return (
    <StickyElement shadow={!isTablet} className="top-[75px] z-10 h-[52px]">
      <SearchInput
        search={search}
        setSearch={setSearch}
        classNames={{
          inputWrapper: 'h-[52px]',
        }}
        {...props}
      />
    </StickyElement>
  );
};
