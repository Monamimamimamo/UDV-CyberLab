import { TestToolsIcon } from '@/shared/assets/svgs';
import { Button } from '@/shared/ui';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import { ToolsContent } from './ToolsContent';

export const ToolsPopover = ({ id }: { id: string }) => {
  return (
    <Popover
      radius="sm"
      key="right-start"
      placement="right-start"
      classNames={{
        content: 'p-1 overflow-hidden bg-white',
      }}
    >
      <PopoverTrigger>
        <Button isIconOnly color="default" variant="light">
          <TestToolsIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <ToolsContent id={id} />
      </PopoverContent>
    </Popover>
  );
};
