import { projectSorting } from '@/entities/sorting';
import { Select, SelectItem } from '@/shared/ui';

const selectClassNames = {
  itemClasses: {
    base: 'data-[hover=true]:bg-controls data-[selectable=true]:focus:text-foreground data-[hover=true]:text-foreground data-[selectable=true]:focus:bg-controls',
  },
};

type ProjectSortingSelectProps = {
  sort: string;
  setSort: (value: string) => void;
};

export const ProjectSortingSelect = ({
  sort,
  setSort,
}: ProjectSortingSelectProps) => {
  return (
    <Select
      color="white"
      aria-label="Выберите сортировку"
      size="lg"
      listboxProps={selectClassNames}
      popoverProps={{
        placement: 'bottom-start',
      }}
      selectedKeys={[sort ?? '']}
      onChange={e => setSort(e.target.value)}
      placeholder="Выберите сортировку"
      classNames={{
        value: 'text-[14px] text-foreground/50',
      }}
    >
      {projectSorting.map(({ label, key }) => (
        <SelectItem key={key}>{label}</SelectItem>
      ))}
    </Select>
  );
};
