import { useMyTestList } from '@/entities/test-info';
import { TestList } from '@/widgets/test-list';

const MyTestsPage = () => {
  const { data } = useMyTestList();

  return (
    <section>
      <TestList tests={data} />
    </section>
  );
};

export default MyTestsPage;
