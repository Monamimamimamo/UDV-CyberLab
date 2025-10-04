import { useNavigation } from '@/shared/hooks';
import { Button, StickyElement } from '@/shared/ui';
import { useState } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { AsideWrapper } from './AsideWrapper';

const MobileBurger = ({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <Button
      onPress={onToggle}
      isIconOnly
      variant="light"
      radius="sm"
      className="text-[36px]"
    >
      {isOpen ? <IoClose /> : <HiMenuAlt3 />}
    </Button>
  );
};

export const HeaderMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollNavigate } = useNavigation();

  return (
    <>
      <StickyElement shadow className="top-0 z-[20] sticky">
        <header className="h-[60px] bg-header">
          <div className="h-full w-full flex items-center px-4 gap-4">
            <MobileBurger
              isOpen={isOpen}
              onToggle={() => setIsOpen(prev => !prev)}
            />
            <Button
              onPress={() => scrollNavigate('/')}
              variant="light"
              radius="sm"
            >
              <h1 className="bg-main-gradient bg-clip-text text-transparent font-w3ip text-[32px] leading-[40px]">
                NEO Lab
              </h1>
            </Button>
          </div>
        </header>
      </StickyElement>
      <AsideWrapper isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
