import { usePassedTestList } from '@/entities/test-info';
import { TestList } from '@/widgets/test-list';

const MyPassedTestsPage = () => {
  const { data } = usePassedTestList();

  return (
    <section>
      <TestList tests={data} />
    </section>
  );
};

export default MyPassedTestsPage;
