import { Textarea } from '@/shared/ui';
import { useRef, useState, useCallback, useEffect } from 'react';

type TextareaProps = {
  value: string;
  onChange: (value: string) => void;
};

export const TextareaWithFocus = ({ value, onChange }: TextareaProps) => {
  const isUnmounting = useRef(false);
  const [text, setText] = useState(value);

  const saveAnswer = useCallback(() => {
    if (isUnmounting.current) return;
    onChange(text);
  }, [onChange, text]);

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
      value={text}
      classNames={{
        inputWrapper: 'rounded-[8px]',
        input: 'without-scrollbar',
      }}
      onValueChange={setText}
      minRows={1}
      color="white"
      aria-label="Текст вопроса"
      placeholder="Вопрос"
    />
  );
};
