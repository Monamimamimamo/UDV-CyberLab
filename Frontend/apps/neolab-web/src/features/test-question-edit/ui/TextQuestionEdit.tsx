import { Textarea } from '@/shared/ui';
import { useCallback, useEffect, useRef, useState } from 'react';

type TextQuestionEditProps = {
  question: string;
  handleChangeQuestion: (value: string) => void;
};

export const TextQuestionEdit = ({
  question,
  handleChangeQuestion,
}: TextQuestionEditProps) => {
  const isUnmounting = useRef(false);
  const [text, setText] = useState(question);

  const saveAnswer = useCallback(() => {
    if (isUnmounting.current) return;
    handleChangeQuestion(text);
  }, [handleChangeQuestion, text]);

  useEffect(() => {
    isUnmounting.current = false;

    return () => {
      isUnmounting.current = true;
      saveAnswer();
    };
  }, [saveAnswer]);

  return (
    <Textarea
      onBlur={saveAnswer}
      className="mb-3"
      value={text}
      onChange={e => setText(e.target.value)}
      classNames={{
        inputWrapper: 'rounded-[8px]',
        input: 'without-scrollbar',
      }}
      minRows={1}
      color="white"
      aria-label="Текст вопроса"
      placeholder="Вопрос"
    />
  );
};
