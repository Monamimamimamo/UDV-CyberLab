import { AnswersTable } from '@/widgets/test-answers-table';
import { ContentSwitcher } from '@/features/content-switcher';
import { Card } from '@/shared/ui';
import { useNavigate } from 'react-router-dom';
import { TestTitle } from '@/entities/test-info';
import { useCurrentTest, useTestFinish } from '@/entities/test-passing';

const TestOverviewPage = () => {
  const navigate = useNavigate();
  const { mutateAsync } = useTestFinish();
  const { testId, test, answers } = useCurrentTest();

  const handlePrevClick = () => navigate(-1);

  const handleNextClick = () => {
    mutateAsync(testId).then(() => {
      navigate(`/tests/${testId}/results`, { replace: true });
    });
  };

  if (!test) {
    return null;
  }

  return (
    <div className="max-w-[712px] w-full flex flex-col gap-[12px] min-h-svh">
      <Card className="sm:py-[40px] py-[20px] sm:px-[64px] px-2">
        <TestTitle className="px-[20px] pb-3" title={test.title} />
        <AnswersTable answers={answers} />
      </Card>
      <div>
        <ContentSwitcher
          handlePrev={handlePrevClick}
          handleNext={handleNextClick}
          prevLabel="Вернуться"
          nextLabel="Завершить"
        />
      </div>
    </div>
  );
};

export default TestOverviewPage;
