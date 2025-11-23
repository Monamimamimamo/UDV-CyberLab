import { useMediaQuery } from '@/shared/hooks';
import { type InputProps, SearchInput, StickyElement } from '@/shared/ui';
import clsx from 'clsx';
import { useQueryState } from 'nuqs';

export const StickySearch = (props: InputProps & { stickyClassNames?: string }) => {
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
  const [search, setSearch] = useQueryState('search', { defaultValue: '' });

  return (
    <StickyElement
      shadow={!isTablet}
      className={clsx('top-[75px] z-10 h-[52px]', props.stickyClassNames)}
    >
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
