import { Button } from '@/shared/ui';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/react';
import { useMemo, useState } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';

interface ActionsTriggerProps {
  children: React.ReactNode | ((closePopover: () => void) => React.ReactNode);
}

const isRenderFunction = (
  children: ActionsTriggerProps['children'],
): children is (closePopover: () => void) => React.ReactNode => {
  return typeof children === 'function';
};

export const ActionsTrigger = ({ children }: ActionsTriggerProps) => {
  const [open, setOpen] = useState(false);

  const closePopover = () => setOpen(false);

  const content = useMemo(() => {
    if (isRenderFunction(children)) {
      return children(closePopover);
    }

    return children;
  }, [children]);

  return (
    <Popover
      radius="sm"
      showArrow
      placement="bottom-end"
      classNames={{ content: 'p-1 overflow-hidden bg-white' }}
      isOpen={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger>
        <Button variant="light" radius="sm" size="sm" isIconOnly>
          <HiOutlineDotsVertical size={22} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>{content}</PopoverContent>
    </Popover>
  );
};
