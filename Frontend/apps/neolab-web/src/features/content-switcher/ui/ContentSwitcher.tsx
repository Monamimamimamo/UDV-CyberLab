import { Button } from '@/shared/ui';
import { cn } from '@heroui/react';
import clsx from 'clsx';

const btnClassname = 'text-[16px] w-[160px] h-[40px]';

type ContentSwitcherProps = {
  isPrevDisabled?: boolean;
  isNextDisabled?: boolean;
  handleNext?: () => void;
  handlePrev?: () => void;
  nextLabel?: string;
  prevLabel?: string;
  hasNext?: boolean;
  hasPrev?: boolean;
};

export const ContentSwitcher = ({
  hasNext = true,
  hasPrev = true,
  isPrevDisabled = true,
  isNextDisabled = true,
  handleNext = () => {},
  handlePrev = () => {},
  prevLabel = 'Назад',
  nextLabel = 'Далее',
}: ContentSwitcherProps) => {
  return (
    <div
      className={clsx(
        'flex flex-row sm:pb-10 pb-5',
        !hasPrev && 'justify-end',
        !hasNext && 'justify-start',
        hasNext && hasPrev && 'justify-between'
      )}
    >
      <Button
        isDisabled={!isPrevDisabled}
        onPress={handlePrev}
        size="md"
        className={cn(btnClassname, !hasPrev && 'hidden')}
        color="white"
      >
        {prevLabel}
      </Button>
      <Button
        onPress={handleNext}
        isDisabled={!isNextDisabled}
        size="md"
        className={cn(btnClassname, !hasNext && 'hidden')}
        color="gradient"
      >
        {nextLabel}
      </Button>
    </div>
  );
};
