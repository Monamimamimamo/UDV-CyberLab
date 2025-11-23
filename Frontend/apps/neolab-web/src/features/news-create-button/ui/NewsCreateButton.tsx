import { useMediaQuery } from '@/shared/hooks';
import { Button } from '@/shared/ui';
import { MdAdd } from 'react-icons/md';

type NewsCreateButtonProps = {
  onCliсk: () => void;
};

export const NewsCreateButton = ({
  onCliсk,
}: NewsCreateButtonProps) => {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  return (
    <Button
      fullWidth={isMobile}
      color="gradient"
      onPress={onCliсk}
      size={isMobile ? 'lg' : 'md'}
      endContent={<MdAdd size={22} />}
    >
      Добавить новость
    </Button>
  );
};
