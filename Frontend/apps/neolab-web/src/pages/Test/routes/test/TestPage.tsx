import { Questions } from '@/widgets/test-questions';
import { TestStatus, useCurrentTest } from '@/entities/test-passing';
import { TestExit } from '@/features/test-exit';
import { TestTitle } from '@/entities/test-info';
import { Spinner } from '@/shared/ui';

const TestPage = () => {
  const { testId, test, isFetching, savedAnswers, answers, attemptId } = useCurrentTest();

  if (isFetching) {
    return (
      <div className="flex w-full items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (!test) {
    return null;
  }

  return (
    <section className="w-full">
      <TestTitle title={test.title} />
      <Questions
        id={testId}
        attemptTestId={attemptId}
        questions={test.questions}
        savedAnswers={savedAnswers}
        answers={answers}
        totalQuestions={test.totalQuestions}
        endContent={
          <div className="mt-2 flex flex-row justify-between gap-2 sm:flex-col sm:justify-start sm:gap-1">
            <TestStatus
              testId={testId}
              savedAnswers={answers}
              leftTestTime={test.leftTestTime}
              totalQuestions={test.totalQuestions}
            />
            <TestExit id={testId} />
          </div>
        }
      />
    </section>
  );
};

export default TestPage;
