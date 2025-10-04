import { TestTitle, useTestAttempt } from '@/entities/test-info';
import { ContentSwitcher } from '@/features/content-switcher';
import { TestAttemptTable } from '@/widgets/test-attempt-table';
import { Card } from '@heroui/react';
import { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const TestResultPage = () => {
  const { state } = useLocation();
  const redirectPath = useMemo(() => state?.from, [state?.from]);
  const { testId = '', attemptId = '' } = useParams();
  const navigate = useNavigate();
  const { data } = useTestAttempt(attemptId);

  if (!attemptId || !testId) return null;

  return (
    <section className="max-w-[712px] w-full h-full flex flex-col gap-[12px]">
      <Card className="sm:pt-[40px] pt-[20px] sm:pb-[24px] pb-[20px] sm:px-[32px] px-2">
        <div className="pl-[20px] pb-3">
          <TestTitle title={data.testName} />

          <p className="text-second text-[18px]">
            Попытка: {data.attemptNumber}
          </p>
        </div>

        <TestAttemptTable result={data} testId={testId} />
      </Card>
      <ContentSwitcher
        nextLabel="Подробнее"
        handlePrev={() => navigate(redirectPath || `/tests/${testId}/results`)}
        handleNext={() =>
          navigate(`/tests/${testId}/results/${data.id}/preview`)
        }
      />
    </section>
  );
};

export default TestResultPage;
