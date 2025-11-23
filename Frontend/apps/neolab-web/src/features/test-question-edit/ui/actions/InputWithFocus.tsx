import { Input } from '@/shared/ui';
import { useRef, useState, useCallback, useEffect } from 'react';

type InputProps = {
  value: string;
  onChange: (value: string) => void;
};

export const InputWithFocus = ({ value, onChange }: InputProps) => {
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
    <Input
      onBlur={saveAnswer}
      value={text}
      onValueChange={setText}
      className="w-full mr-2"
      variant="underlined"
    />
  );
};
