import { useTestList } from '@/entities/test-info';
import { AdminTestList } from './AdminTestList';

type Filters = {
  search?: string;
  difficulty?: string;
  subject?: string;
};

export const AdminTestListWithQuery = ({ search, difficulty, subject }: Filters) => {
  const { data } = useTestList({
    search,
    difficulty,
    subject,
  });

  return <AdminTestList tests={data} />;
};
