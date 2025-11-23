import type { PreviewQuestionDTO } from '@/entities/test-info';
import type { QuestionDTO, QuestionType } from '@/shared/api/dto';
import {
  PreviewSelectAnswer,
  PreviewFileAnswer,
  PreviewTextAnswer,
  PreviewRadioAnswer,
  PreviewCheckboxAnswer,
} from './preview-answers';

type QuestionAnswersProps = {
  type: QuestionType;
  previewAnswer?: PreviewQuestionDTO;
  question: QuestionDTO;
};

export const PreviewAnswers = ({
  type,
  previewAnswer,
  question,
}: QuestionAnswersProps) => {
  switch (type) {
    case 'QuestionVariant':
      if (question.isMultipleChoice) {
        return (
          <PreviewCheckboxAnswer
            previewAnswer={previewAnswer}
            question={question}
          />
        );
      }
      return (
        <PreviewRadioAnswer previewAnswer={previewAnswer} question={question} />
      );
    case 'QuestionOpen':
      return <PreviewTextAnswer previewAnswer={previewAnswer} />;
    case 'QuestionCompliance':
      return (
        <PreviewSelectAnswer
          previewAnswer={previewAnswer}
          question={question}
        />
      );
    case 'QuestionFile':
      return <PreviewFileAnswer />;
    default:
      return <></>;
  }
};
