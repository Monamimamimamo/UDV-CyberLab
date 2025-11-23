import { TestFilters } from '@/widgets/test-filters';
import { useQueryState } from 'nuqs';
import { useMediaQuery } from '@/shared/hooks';
import { Spinner, StickyElement } from '@/shared/ui';
import { TestListWithFilters } from './ui/TestListWithFilters';
import { QueryBoundary, StickySearch } from '@/shared/common/components';

const TestsPage = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const [search] = useQueryState('search', { defaultValue: '' });
  const [difficulty, setDifficulty] = useQueryState('difficulty', {
    defaultValue: '',
  });
  const [subject, setSubject] = useQueryState('subject', { defaultValue: '' });

  return (
    <section className="flex w-full flex-col gap-5 md:flex-row">
      <div className="flex w-full flex-col gap-3">
        <StickySearch placeholder="Поиск теста..." />

        {isMobile && (
          <TestFilters
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            subject={subject}
            setSubject={setSubject}
          />
        )}
        <QueryBoundary
          fallbackLoader={
            <div className="mt-20 flex w-full items-center justify-center">
              <Spinner size="lg" color="primary" />
            </div>
          }
        >
          <TestListWithFilters search={search} difficulty={difficulty} subject={subject} />
        </QueryBoundary>
      </div>
      {!isMobile && (
        <div className="w-full max-w-[224px]">
          <StickyElement className="top-[75px] md:sticky">
            <TestFilters
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              subject={subject}
              setSubject={setSubject}
            />
          </StickyElement>
        </div>
      )}
    </section>
  );
};

export default TestsPage;
