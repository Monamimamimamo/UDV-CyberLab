import { useCreateTest } from '@/entities/test-info';
import { useMediaQuery, useNavigation } from '@/shared/hooks';
import { Button, Spinner } from '@/shared/ui';
import { MdAdd } from 'react-icons/md';

export const CreateTestButton = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const { mutateAsync, isPending } = useCreateTest();
  const { scrollNavigate } = useNavigation();

  const handleCreate = () => {
    mutateAsync().then(response => {
      scrollNavigate(`/tests/manage/${response}/edit`);
    });
  };

  return (
    <Button
      isDisabled={isPending}
      fullWidth={isMobile}
      color="gradient"
      onPress={handleCreate}
      size={isMobile ? 'lg' : 'md'}
      endContent={
        isPending ? <Spinner size="sm" color="white" /> : <MdAdd size={22} />
      }
    >
      Создать тест
    </Button>
  );
};
