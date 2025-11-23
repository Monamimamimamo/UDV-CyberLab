import {
  CheckboxAnswer,
  FileAnswer,
  RadioAnswer,
  SelectAnswer,
  TextAnswer,
} from './answers';
import type {
  SavedAnswer,
  SavedComplianceAnswerDTO,
  SavedFileAnswerDTO,
  SavedOpenAnswerDTO,
  SavedVariantAnswerDTO,
} from '@/entities/test-passing';
import type { QuestionDTO, QuestionType } from '@/shared/api/dto';

type QuestionAnswersProps = {
  type: QuestionType;
  question: QuestionDTO;
  setCurrentAnswer: (answer: SavedAnswer) => void;
  currentAnswer?: SavedAnswer | null;
};

export const QuestionAnswers = ({
  type,
  question,
  setCurrentAnswer,
  currentAnswer,
}: QuestionAnswersProps) => {
  switch (type) {
    case 'QuestionVariant':
      if (question.isMultipleChoice) {
        return (
          <CheckboxAnswer
            question={question}
            setCurrentAnswer={setCurrentAnswer}
            currentAnswer={currentAnswer as SavedVariantAnswerDTO}
          />
        );
      }
      return (
        <RadioAnswer
          question={question}
          setCurrentAnswer={setCurrentAnswer}
          currentAnswer={currentAnswer as SavedVariantAnswerDTO}
        />
      );
    case 'QuestionOpen':
      return (
        <TextAnswer
          question={question}
          setCurrentAnswer={setCurrentAnswer}
          currentAnswer={currentAnswer as SavedOpenAnswerDTO}
        />
      );
    case 'QuestionCompliance':
      return (
        <SelectAnswer
          question={question}
          setCurrentAnswer={setCurrentAnswer}
          currentAnswer={currentAnswer as SavedComplianceAnswerDTO}
        />
      );
    case 'QuestionFile':
      return (
        <FileAnswer
          question={question}
          setCurrentAnswer={setCurrentAnswer}
          currentAnswer={currentAnswer as SavedFileAnswerDTO}
        />
      );
    default:
      return <></>;
  }
};
