import { Input, type InputProps } from '@/shared/ui';
import clsx from 'clsx';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export const PasswordInput = (props: InputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      {...props}
      endContent={
        <button
          type="button"
          onClick={toggleVisibility}
          aria-label="toggle password visibility"
          className={clsx(
            'custom-outline rounded-md text-2xl transition-background duration-200 cursor-pointer',
            props.isInvalid
              ? 'text-danger hover:text-danger-300'
              : 'text-foreground hover:text-foreground/80',
          )}
        >
          {isVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      }
      type={isVisible ? 'text' : 'password'}
    />
  );
};

PasswordInput.displayName = 'PasswordInput';
