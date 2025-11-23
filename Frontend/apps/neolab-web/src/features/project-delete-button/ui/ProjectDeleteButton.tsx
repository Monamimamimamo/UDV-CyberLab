import { Button } from '@/shared/ui';
import { Tooltip } from '@heroui/react';
import { MdDelete } from 'react-icons/md';

type ProjectDeleteButtonProps = {
  handleClick: () => void;
};

export const ProjectDeleteButton = ({
  handleClick,
}: ProjectDeleteButtonProps) => {
  return (
    <Tooltip
      showArrow
      placement="bottom"
      radius="sm"
      delay={500}
      closeDelay={0}
      offset={2}
      size="sm"
      content="Удалить проект"
    >
      <Button
        className="border-foreground/20"
        onPress={handleClick}
        radius="sm"
        size="md"
        isIconOnly
        color="white"
        variant="faded"
      >
        <MdDelete size={20} />
      </Button>
    </Tooltip>
  );
};
