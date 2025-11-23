import { MdModeEdit } from 'react-icons/md';
import { Button } from '@/shared/ui';
import { Tooltip } from '@heroui/react';

type ProjectEditButtonProps = {
  handleClick: () => void;
};

export const ProjectEditButton = ({ handleClick }: ProjectEditButtonProps) => {
  return (
    <Tooltip
      showArrow
      placement="bottom"
      radius="sm"
      delay={500}
      closeDelay={0}
      offset={2}
      size="sm"
      content="Редактировать проект"
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
        <MdModeEdit size={20} />
      </Button>
    </Tooltip>
  );
};
