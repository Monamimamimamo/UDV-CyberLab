import { newsDefaultSorting } from '@/entities/sorting';
import { NewsCreateButton } from '@/features/news-create-button';
import { useMediaQuery } from '@/shared/hooks';
import { SearchInput, StickyElement } from '@/shared/ui';

import { Select, SelectItem } from '@/shared/ui';
import clsx from 'clsx';
import { useQueryState } from 'nuqs';

const selectClassNames = {
  itemClasses: {
    base: 'data-[hover=true]:bg-controls data-[selectable=true]:focus:text-foreground data-[hover=true]:text-foreground data-[selectable=true]:focus:bg-controls',
  },
};

type NewsSelectProps = {
  sort: string;
  setSort: (value: string) => void;
};

type AdminNewsFilters = {
  withCreateButton?: boolean;
  fullPage?: boolean;
};

export const AdminNewsFilters = ({
  sort,
  setSort,
  withCreateButton = false,
  fullPage = false,
}: NewsSelectProps & AdminNewsFilters) => {
  const [search, setSearch] = useQueryState('search', { defaultValue: '' });
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });

  return (
    <StickyElement
      shadow={!isTablet}
      className={clsx(
        'top-[75px] z-10',
        fullPage && 'my-2 flex flex-col items-center justify-between gap-4 sm:flex-row',
      )}
    >
      <SearchInput
        search={search}
        setSearch={setSearch}
        classNames={{
          inputWrapper: 'h-[52px]',
        }}
        placeholder="Поиск новости..."
      />
      <div
        className={clsx(
          'flex w-full flex-col items-center justify-between gap-4 sm:w-auto sm:flex-row',
          !fullPage && 'mt-4',
        )}
      >
        <div className="w-full sm:w-[250px]">
          <Select
            color="white"
            aria-label="Выберите сортировку"
            size="lg"
            listboxProps={selectClassNames}
            popoverProps={{
              placement: 'bottom-start',
            }}
            selectedKeys={[sort ?? '']}
            onChange={(e) => setSort(e.target.value)}
            placeholder="Выберите сортировку"
            classNames={{
              value: 'text-[14px] text-foreground/50',
            }}
          >
            {newsDefaultSorting.map(({ label, key }) => (
              <SelectItem key={key}>{label}</SelectItem>
            ))}
          </Select>
        </div>
        {withCreateButton && (
          <div className="bg-background mt-3 w-full self-end rounded-xl drop-shadow-md sm:mt-0 sm:w-auto">
            <NewsCreateButton onCliсk={() => console.log(1)} />
          </div>
        )}
      </div>
    </StickyElement>
  );
};
