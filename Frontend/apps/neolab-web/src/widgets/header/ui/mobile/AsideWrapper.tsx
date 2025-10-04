import { cn } from '@heroui/react';
import { AsideContent } from './AsideContent';
import { AsideFooter } from './AsideFooter';

type AsideWrapperProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const AsideWrapper = ({ isOpen, setIsOpen }: AsideWrapperProps) => {
  return (
    <>
      {isOpen && (
        <div
          onClick={e => {
            e.stopPropagation();
            setIsOpen(false);
          }}
          className="fixed top-[60px] left-0 w-full h-full z-10"
        />
      )}
      <aside
        className={cn(
          'fixed left-0 bottom-0 w-full top-[60px] bg-white flex items-center justify-center overflow-hidden drop-shadow-xl z-20',
          isOpen ? 'max-w-[340px]' : 'max-w-0'
        )}
      >
        {isOpen && (
          <div
            className={cn('flex h-full w-full flex-col justify-between p-1')}
          >
            <AsideContent setIsOpen={() => setIsOpen(false)} />
            <AsideFooter />
          </div>
        )}
      </aside>
    </>
  );
};
