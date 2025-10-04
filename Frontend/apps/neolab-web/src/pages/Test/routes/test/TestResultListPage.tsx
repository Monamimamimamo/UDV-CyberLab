import { TestTitle, useTestResults } from '@/entities/test-info';
import { useAnswers } from '@/entities/test-passing';
import { BackButton, Card, Spinner } from '@/shared/ui';
import { TestResultChart } from '@/widgets/test-result-chart';
import { TestResultTable } from '@/widgets/test-result-table';
import { useEffect, useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';

const TestResultListPage = () => {
  const { testId: id = '' } = useParams();
  const { data, isFetching } = useTestResults(id);
  const reset = useAnswers((state) => state.reset);

  const sortedData = useMemo(
    () => ({
      ...data,
      attempts: data.attempts.sort((a, b) => a.attempt - b.attempt),
    }),
    [data],
  );

  useEffect(() => {
    reset();
  }, [reset]);

  if (isFetching)
    return (
      <div className="flex w-full items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );

  if (sortedData.totalAttempts === 1) {
    return (
      <Navigate
        replace
        to={`/tests/${sortedData.testId}/results/${sortedData.attempts[0].attemptId}`}
      />
    );
  }

  return (
    <div className="flex h-full w-full max-w-[712px] flex-col items-start gap-1.5">
      <BackButton label="Назад к тестам" to="/tests/my" />
      <Card className="mb-3 h-full w-full px-[15px] pt-[40px] pb-[24px] sm:px-[32px]">
        <div>
          <TestTitle title={sortedData.title} className="px-[15px]" />
          <TestResultChart results={sortedData} />
          <TestResultTable results={sortedData} />
        </div>
      </Card>
    </div>
  );
};

export default TestResultListPage;
