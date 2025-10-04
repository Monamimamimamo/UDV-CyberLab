import { BiArrowBack } from 'react-icons/bi';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

export type BackButtonProps = {
  label?: string;
  to?: string;
  className?: string;
};

export const BackButton = ({
  label = 'Назад',
  to,
  className,
}: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button type="button" onPress={handleClick} size="md" variant="light">
      <BiArrowBack className={clsx('text-[25px]', className)} /> {label}
    </Button>
  );
};
