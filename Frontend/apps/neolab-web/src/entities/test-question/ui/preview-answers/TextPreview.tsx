import type { PreviewQuestionDTO } from '@/entities/test-info';
import { Textarea } from '@/shared/ui';

export const PreviewTextAnswer = ({
  previewAnswer,
}: {
  previewAnswer?: PreviewQuestionDTO;
}) => {
  return (
    <Textarea
      classNames={{
        input:
          previewAnswer?.correctAnswerText === previewAnswer?.userAnswerText
            ? '!text-green-500'
            : '!text-rose-500',
      }}
      isDisabled={true}
      minRows={1}
      maxRows={6}
      placeholder="Развернутый ответ"
      variant="underlined"
      value={previewAnswer?.userAnswerText || ''}
    />
  );
};
