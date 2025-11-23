import { difficultyFilters, subjectFilters } from '@/entities/filter';
import { Filter } from '@/features/filter';
import { useMediaQuery } from '@/shared/hooks';
import { Scrollbar, Select } from '@/shared/ui';
import { Accordion, AccordionItem, SelectItem } from '@heroui/react';

const accordionClassNames = {
  title: 'text-[14px] text-foreground',
  indicator: 'text-foreground',
  content: 'py-1.5',
};

export interface TestFiltersProps {
  difficulty: string | null;
  setDifficulty: (value: string | null) => void;
  subject: string | null;
  setSubject: (value: string | null) => void;
}

const selectClassNames = {
  itemClasses: {
    base: 'data-[hover=true]:bg-controls data-[selectable=true]:focus:text-foreground data-[hover=true]:text-foreground data-[selectable=true]:focus:bg-controls',
  },
};

export const TestFilters = ({
  difficulty,
  setDifficulty,
  subject,
  setSubject,
}: TestFiltersProps) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <>
      {isMobile ? (
        <div className="flex flex-col gap-1">
          <Select
            color="white"
            aria-label="Сложность теста"
            size="lg"
            listboxProps={selectClassNames}
            popoverProps={{
              placement: 'bottom-start',
            }}
            selectedKeys={[difficulty ?? '']}
            onChange={e => setDifficulty(e.target.value)}
            placeholder="Сложность"
            classNames={{
              value: 'text-[14px] text-foreground/50',
            }}
          >
            {difficultyFilters.map(({ label, key }) => (
              <SelectItem key={key}>{label}</SelectItem>
            ))}
          </Select>
          <Select
            color="white"
            aria-label="Тематика теста"
            size="lg"
            listboxProps={selectClassNames}
            popoverProps={{
              placement: 'bottom-start',
            }}
            selectedKeys={[subject ?? '']}
            onChange={e => setSubject(e.target.value)}
            placeholder="Тематика"
            classNames={{
              value: 'text-[14px] text-foreground/50',
            }}
          >
            {subjectFilters.map(({ label, key }) => (
              <SelectItem key={key}>{label}</SelectItem>
            ))}
          </Select>
        </div>
      ) : (
        <Accordion
          // selectionMode="multiple"
          isCompact
          variant="shadow"
          className="bg-white rounded-lg"
          dividerProps={{ className: 'bg-background' }}
        >
          <AccordionItem
            key="Сложность"
            aria-label="Сложность"
            title="Сложность"
            classNames={accordionClassNames}
          >
            <Filter
              onChange={setDifficulty}
              currentValue={difficulty}
              listItems={difficultyFilters}
            />
          </AccordionItem>
          <AccordionItem
            key="Тематика"
            aria-label="Тематика"
            title="Тематика"
            classNames={accordionClassNames}
          >
            <Scrollbar className="h-[250px]">
              <Filter
                onChange={setSubject}
                currentValue={subject}
                listItems={subjectFilters}
              />
            </Scrollbar>
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
};
