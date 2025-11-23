import { useTestList } from '@/entities/test-info';
import { TestList } from '@/widgets/test-list';

type Filters = {
  search: string;
  difficulty: string;
  subject: string;
};

export const TestListWithFilters = ({
  search,
  difficulty,
  subject,
}: Filters) => {
  const { data } = useTestList({
    search,
    difficulty,
    subject,
  });

  return <TestList tests={data} />;
};
