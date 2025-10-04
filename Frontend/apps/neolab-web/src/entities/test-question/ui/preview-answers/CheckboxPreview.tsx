import type { PreviewQuestionDTO } from '@/entities/test-info';
import type { VariantQuestionDTO } from '@/shared/api/dto';
import { Checkbox, CheckboxGroup } from '@/shared/ui';

export const PreviewCheckboxAnswer = ({
  question,
  previewAnswer,
}: {
  question: VariantQuestionDTO;
  previewAnswer?: PreviewQuestionDTO;
}) => {
  return (
    <CheckboxGroup
      classNames={{
        wrapper: 'gap-[12px]',
      }}
      value={previewAnswer?.userChoices.map(String) ?? []}
    >
      {question.stringAnswers.map((answer: string, index: number) => {
        const userAnswer = previewAnswer?.userChoices.find(
          choice => choice === index
        );
        const correct = previewAnswer?.correctChoices.find(
          choice => choice === index
        );

        const isCorrect = userAnswer === index && correct === index;
        const isError = userAnswer === index && correct !== index;
        const isMissed = userAnswer !== index && correct === index;

        return (
          <Checkbox
            classNames={{
              wrapper: [
                isCorrect && 'before:!border-green-500 after:!bg-green-500',
                isError && 'before:!border-rose-500 after:!bg-rose-500',
                isMissed && 'before:!border-green-500',
              ],
            }}
            radius="sm"
            size="md"
            value={String(index)}
            key={index}
          >
            {answer}
          </Checkbox>
        );
      })}
    </CheckboxGroup>
  );
};
