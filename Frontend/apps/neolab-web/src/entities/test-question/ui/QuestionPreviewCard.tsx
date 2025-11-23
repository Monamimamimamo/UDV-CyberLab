import { Card } from '@/shared/ui';
import { QuestionTitle } from './QuestionTitle';
import type { QuestionDTO } from '@/shared/api/dto';
import type { PreviewQuestionDTO } from '@/entities/test-info';
import { PreviewAnswers } from './PreviewAnswers';

export const QuestionPreviewCard = ({
  question,
  answer,
}: {
  question: QuestionDTO;
  answer?: PreviewQuestionDTO;
}) => {
  return (
    <Card className="relative">
      <div className="sm:p-[40px] p-[25px] flex flex-col gap-[20px] z-1">
        <QuestionTitle question={question.text} />
        <PreviewAnswers
          previewAnswer={answer}
          key={question.id}
          type={question.questionTypeName}
          question={question}
        />
      </div>
    </Card>
  );
};
