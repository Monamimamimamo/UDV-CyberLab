import { useMediaQuery } from '@/shared/hooks';
import { Button } from '@/shared/ui';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export const NewsCreateButton = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  const onClick = () => {
    navigate('/admin/news/create');
  };

  return (
    <Button
      fullWidth={isMobile}
      color="gradient"
      onPress={onClick}
      size={isMobile ? 'lg' : 'md'}
      endContent={<MdAdd size={22} />}
    >
      Добавить новость
    </Button>
  );
};
