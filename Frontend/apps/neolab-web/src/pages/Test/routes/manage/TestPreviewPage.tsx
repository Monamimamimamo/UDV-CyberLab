import { useTestEditing } from '@/entities/test-editing';
import { TestTitle } from '@/entities/test-info';
import { QuestionsPreview } from '@/widgets/test-questions-preview';
import { useNavigate, useParams } from 'react-router-dom';

const TestPreviewPage = () => {
  const { testId: id = '' } = useParams();
  const navigate = useNavigate();
  const { data } = useTestEditing(id);

  const handleFinishClick = () => navigate('/tests/my/created');
  const handleStartClick = () => navigate(`/tests/manage/${data.id}/settings`);

  return (
    <section className="w-full">
      <TestTitle title={data.name} />
      <QuestionsPreview
        id={data.id}
        questions={data.questions}
        totalQuestions={data.questions.length}
        handleFinish={handleFinishClick}
        handleStart={handleStartClick}
      />
    </section>
  );
};

export default TestPreviewPage;
