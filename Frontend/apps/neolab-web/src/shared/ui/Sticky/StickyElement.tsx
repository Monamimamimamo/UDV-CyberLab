import { useScrollPosition } from '@/shared/hooks';
import { cn } from '@heroui/react';

type StickyElementProps = {
  shadow?: boolean;
  threshold?: number;
  children: React.ReactNode;
  className?: string;
};

export const StickyElement = ({
  shadow = false,
  threshold = 0,
  children,
  className,
}: StickyElementProps) => {
  const { isScrolled } = useScrollPosition({
    threshold,
    isDisabled: !shadow,
  });

  return (
    <div
      className={cn(
        'duration-200 lg:sticky z-10',
        shadow && isScrolled ? 'drop-shadow-md' : 'drop-shadow-none',
        className
      )}
    >
      {children}
    </div>
  );
};
