import { useCreateTest } from '@/entities/test-info';
import { useUserStatus } from '@/entities/user';
import { useNavigation } from '@/shared/hooks';
import { Button, Spinner } from '@/shared/ui';
import { MdAdd } from 'react-icons/md';

export const EmptyTestList = () => {
  const { mutateAsync, isPending } = useCreateTest();
  const { scrollNavigate } = useNavigation();
  const { isTeacher } = useUserStatus();

  const handleCreate = () => {
    mutateAsync().then((response) => {
      scrollNavigate(`/tests/manage/${response}/edit`);
    });
  };

  return (
    <div className="mt-[20px] flex w-full justify-center">
      <div className="flex w-full max-w-[400px] flex-col items-center">
        <p className="text-foreground font-w3ip bg-main-gradient bg-clip-text text-3xl text-transparent">
          404
        </p>
        <p className="text-second mb-3">Тесты не найдены</p>
        {isTeacher && (
          <Button
            isDisabled={isPending}
            startContent={isPending ? <Spinner size="sm" color="primary" /> : <MdAdd size={22} />}
            size="md"
            radius="sm"
            className="bg-foreground/5 text-foreground/90 font-semibold"
            variant="light"
            onPress={handleCreate}
          >
            Создать тест
          </Button>
        )}
      </div>
    </div>
  );
};
