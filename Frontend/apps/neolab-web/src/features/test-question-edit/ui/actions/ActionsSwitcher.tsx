import { CheckboxAction } from './Checkbox';
import { RadioAction } from './Radio';
import { FileAction } from './File';
import { TextAction } from './Text';
import { SelectAction } from './Select';
import type { QuestionDTO } from '@/shared/api/dto';

type ActionsSwitcherProps = {
  changeQuestion: (value: Partial<QuestionDTO>) => void;
  question: QuestionDTO;
};

export const ActionsSwitcher = ({
  question,
  changeQuestion,
}: ActionsSwitcherProps) => {
  switch (question.questionTypeName) {
    case 'QuestionVariant':
      if (question.isMultipleChoice) {
        return (
          <CheckboxAction question={question} changeQuestion={changeQuestion} />
        );
      }
      return (
        <RadioAction question={question} changeQuestion={changeQuestion} />
      );
    case 'QuestionOpen':
      return <TextAction question={question} changeQuestion={changeQuestion} />;
    case 'QuestionCompliance':
      return (
        <SelectAction question={question} changeQuestion={changeQuestion} />
      );
    case 'QuestionFile':
      return <FileAction />;
    default:
      return <></>;
  }
};
