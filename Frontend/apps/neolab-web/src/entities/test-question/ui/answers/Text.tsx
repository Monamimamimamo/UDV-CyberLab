import type { SavedAnswer, SavedOpenAnswerDTO } from '@/entities/test-passing';
import type { VariantQuestionDTO } from '@/shared/api/dto';
import { Textarea } from '@/shared/ui';
import { useCallback, useEffect, useRef, useState } from 'react';

export const TextAnswer = ({
  question,
  setCurrentAnswer,
  currentAnswer,
}: {
  question: VariantQuestionDTO;
  setCurrentAnswer: (answer: SavedAnswer) => void;
  currentAnswer?: SavedOpenAnswerDTO | null;
}) => {
  const isUnmounting = useRef(false);
  const [value, setValue] = useState(currentAnswer?.answerText ?? '');

  const saveAnswer = useCallback(() => {
    if (isUnmounting.current) return;

    if (setCurrentAnswer) {
      setCurrentAnswer({ answerText: value, questionId: question.id });
    }
  }, [question.id, setCurrentAnswer, value]);

  useEffect(() => {
    isUnmounting.current = false;

    return () => {
      isUnmounting.current = true;
      saveAnswer();
    };
  }, [saveAnswer]);

  return (
    <Textarea
      isDisabled={!setCurrentAnswer}
      minRows={1}
      maxRows={6}
      placeholder="Развернутый ответ"
      variant="underlined"
      value={value}
      onChange={e => setValue(e.target.value)}
      onBlur={saveAnswer}
    />
  );
};
