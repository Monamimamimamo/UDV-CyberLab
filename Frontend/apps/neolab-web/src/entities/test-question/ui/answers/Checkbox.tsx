import type { SavedAnswer, SavedVariantAnswerDTO } from '@/entities/test-passing';
import type { VariantQuestionDTO } from '@/shared/api/dto';
import { Checkbox, CheckboxGroup } from '@/shared/ui';

export const CheckboxAnswer = ({
  question,
  setCurrentAnswer,
  currentAnswer,
}: {
  question: VariantQuestionDTO;
  setCurrentAnswer: (answer: SavedAnswer) => void;
  currentAnswer?: SavedVariantAnswerDTO | null;
}) => {
  return (
    <CheckboxGroup
      classNames={{
        wrapper: 'gap-[12px]',
      }}
      value={currentAnswer?.selectedAnswers.map(String) ?? []}
      onValueChange={(answers: string[]) =>
        setCurrentAnswer?.({
          selectedAnswers: answers.map(Number),
          questionId: question.id,
        })
      }
    >
      {question.stringAnswers.map((answer: string, index: number) => (
        <Checkbox radius="sm" size="md" value={String(index)} key={index}>
          {answer}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
};
