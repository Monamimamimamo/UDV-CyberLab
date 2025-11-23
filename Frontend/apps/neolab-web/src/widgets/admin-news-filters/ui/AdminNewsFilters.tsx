import { newsDefaultSorting } from '@/entities/sorting';
import { NewsCreateButton } from '@/features/news-create-button';
import { StickySearch } from '@/shared/common/components';
import { StickyElement } from '@/shared/ui';

import { Select, SelectItem } from '@/shared/ui';

const selectClassNames = {
  itemClasses: {
    base: 'data-[hover=true]:bg-controls data-[selectable=true]:focus:text-foreground data-[hover=true]:text-foreground data-[selectable=true]:focus:bg-controls',
  },
};

type NewsSelectProps = {
  sort: string;
  setSort: (value: string) => void;
};

export const AdminNewsFilters = ({ sort, setSort }: NewsSelectProps) => {
  return (
    <StickyElement className="top-[75px] z-10">
      <StickySearch placeholder="Поиск новости..." />
      <div className="mt-4 flex flex-col items-center justify-between sm:flex-row">
        <div className="flex sm:max-w-[250px] w-full flex-row items-center gap-2">
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
        <div className="bg-background mt-3 w-full self-end rounded-xl drop-shadow-md sm:mt-0 sm:w-auto">
          <NewsCreateButton onCliсk={() => console.log(1)} />
        </div>
      </div>
    </StickyElement>
  );
};
