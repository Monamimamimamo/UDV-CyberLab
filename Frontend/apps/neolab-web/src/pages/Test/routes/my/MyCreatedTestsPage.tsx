import { useCreatedTestList } from '@/entities/test-info';
import { TestList } from '@/widgets/test-list';

const MyCreatedTestsPage = () => {
  const { data } = useCreatedTestList();

  return (
    <section>
      <TestList tests={data} />
    </section>
  );
};

export default MyCreatedTestsPage;
