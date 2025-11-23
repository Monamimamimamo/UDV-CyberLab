import { useMediaQuery } from '@/shared/hooks';
import { Button } from '@/shared/ui';
import { MdAdd } from 'react-icons/md';

type CreateProjectButtonProps = {
  handleClick: () => void;
};

export const CreateProjectButton = ({
  handleClick,
}: CreateProjectButtonProps) => {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  return (
    <Button
      fullWidth={isMobile}
      color="gradient"
      onPress={handleClick}
      size={isMobile ? 'lg' : 'md'}
      endContent={<MdAdd size={22} />}
    >
      Добавить проект
    </Button>
  );
};
