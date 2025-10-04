import { Button } from '@/shared/ui';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/react';
import { useState } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';

interface UserDeleteActionsTriggerProps {
  children: (closePopover: () => void) => React.ReactNode;
}

export const UserDeleteActionsTrigger = ({ children }: UserDeleteActionsTriggerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      radius="sm"
      key="right-start"
      showArrow
      placement="bottom-end"
      classNames={{
        content: 'p-1 overflow-hidden bg-white',
      }}
      isOpen={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger>
        <Button variant="light" radius="sm" size="sm" isIconOnly>
          <HiOutlineDotsVertical size={22} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>{children(() => setOpen(false))}</PopoverContent>
    </Popover>
  );
};
