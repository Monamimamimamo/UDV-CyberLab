import { Button } from '@/shared/ui';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/react';
import { HiOutlineDotsVertical } from 'react-icons/hi';

export const CommentActionsTrigger = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Popover
      radius="sm"
      key="right-start"
      showArrow
      placement="bottom-end"
      classNames={{
        content: 'p-1 overflow-hidden bg-white',
      }}
    >
      <PopoverTrigger>
        <Button
          className="border-foreground/20"
          variant="faded"
          radius="sm"
          size="sm"
          isIconOnly
          color="white"
        >
          <HiOutlineDotsVertical size={22} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  );
};
