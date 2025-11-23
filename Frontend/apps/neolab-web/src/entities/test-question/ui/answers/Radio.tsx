import type { SavedAnswer, SavedVariantAnswerDTO } from '@/entities/test-passing';
import type { VariantQuestionDTO } from '@/shared/api/dto';
import { Radio, RadioGroup } from '@/shared/ui';

export const RadioAnswer = ({
  question,
  setCurrentAnswer,
  currentAnswer,
}: {
  question: VariantQuestionDTO;
  setCurrentAnswer: (answer: SavedAnswer) => void;
  currentAnswer: SavedVariantAnswerDTO;
}) => {
  return (
    <RadioGroup
      classNames={{
        wrapper: 'gap-[10px]',
      }}
      value={String(currentAnswer && currentAnswer.selectedAnswers[0]) || ''}
      onValueChange={answer =>
        setCurrentAnswer?.({
          selectedAnswers: [Number(answer)],
          questionId: question.id,
        })
      }
    >
      {question.stringAnswers.map((answer: string, index: number) => (
        <Radio key={index} value={String(index)}>
          {answer}
        </Radio>
      ))}
    </RadioGroup>
  );
};
