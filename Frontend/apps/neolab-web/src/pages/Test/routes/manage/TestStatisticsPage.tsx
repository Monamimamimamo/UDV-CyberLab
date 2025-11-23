import { TestTitle, useTestStatistics } from '@/entities/test-info';
import { BackButton, Card } from '@/shared/ui';
import { TestStatisticsTable } from '@/widgets/test-statistics-table';
import { useParams } from 'react-router-dom';

const TestStatisticsPage = () => {
  const { testId: id = '' } = useParams();
  const { data } = useTestStatistics(id);

  return (
    <section className="max-w-[712px] w-full h-full flex flex-col gap-1.5 mb-3 items-start">
      <BackButton to='/tests/my/created' />
      <Card className="sm:pt-[40px] w-full sm:pb-[24px] pt-[20px] pb-[20px] sm:px-[32px] px-1">
        <TestTitle title={data.title} className="px-[20px] pb-3" />
        <TestStatisticsTable testId={id} results={data} />
      </Card>
    </section>
  );
};

export default TestStatisticsPage;
