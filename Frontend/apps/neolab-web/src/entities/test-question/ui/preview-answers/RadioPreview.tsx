import type { PreviewQuestionDTO } from '@/entities/test-info';
import type { VariantQuestionDTO } from '@/shared/api/dto';
import { Radio, RadioGroup } from '@/shared/ui';

export const PreviewRadioAnswer = ({
  question,
  previewAnswer,
}: {
  question: VariantQuestionDTO;
  previewAnswer?: PreviewQuestionDTO;
}) => {
  const userAnswer = previewAnswer?.userChoices[0];
  const correct = previewAnswer?.correctChoices[0];
  return (
    <RadioGroup
      classNames={{
        wrapper: 'gap-[10px]',
      }}
      value={String(previewAnswer?.userChoices[0]) || ''}
    >
      {question.stringAnswers.map((answer: string, index: number) => {
        const isCorrect = userAnswer === index && correct === index;
        const isError = userAnswer === index && correct !== index;
        const isMissed = userAnswer !== index && correct === index;

        return (
          <Radio
            key={index}
            value={String(index)}
            classNames={{
              control: [
                isCorrect && '!bg-green-500',
                isError && '!bg-rose-500',
              ],
              wrapper: [
                isCorrect && '!border-green-500',
                isError && '!border-rose-500',
                isMissed && '!border-green-500',
              ],
            }}
          >
            {answer}
          </Radio>
        );
      })}
    </RadioGroup>
  );
};
