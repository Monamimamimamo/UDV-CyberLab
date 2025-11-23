import { TestTitle, useTestPreview } from '@/entities/test-info';
import { QuestionsPreview } from '@/widgets/test-questions-preview';
import { useNavigate, useParams } from 'react-router-dom';

const TestPreviewPage = () => {
  const { testId = '', attemptId = '' } = useParams();
  const {
    data: { test, answers },
  } = useTestPreview({ testId, attemptId });

  const navigate = useNavigate();

  const handlePreviewFinish = () =>
    navigate(`/tests/${testId}/results/${attemptId}`);

  return (
    <section className="w-full">
      <TestTitle title={test.name} />
      <QuestionsPreview
        answers={answers}
        id={test.id}
        questions={test.questions}
        totalQuestions={test.questions.length}
        handleStart={handlePreviewFinish}
        handleFinish={handlePreviewFinish}
      />
    </section>
  );
};

export default TestPreviewPage;
