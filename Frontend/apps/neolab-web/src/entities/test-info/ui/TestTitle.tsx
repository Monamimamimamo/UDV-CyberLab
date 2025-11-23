import { cn } from '@heroui/react';

type TestTitleProps = {
  title: string;
  className?: string;
};

export const TestTitle = ({ title, className }: TestTitleProps) => {
  return (
    <h2
      className={cn('sm:text-[24px] text-[20px] pt-[4px] pb-[10px]', className)}
    >
      {title}
    </h2>
  );
};
