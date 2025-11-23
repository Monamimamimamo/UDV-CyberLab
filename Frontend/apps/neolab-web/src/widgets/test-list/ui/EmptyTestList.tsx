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
    mutateAsync().then(response => {
      scrollNavigate(`/tests/manage/${response}/edit`);
    });
  };

  return (
    <div className="flex justify-center mt-[20px] w-full">
      <div className="max-w-[400px] w-full flex flex-col items-center">
        <p className="text-foreground font-w3ip text-3xl bg-main-gradient text-transparent bg-clip-text">
          404
        </p>
        <p className="text-second mb-3">Тесты не найдены</p>
        {isTeacher && (
          <Button
            isDisabled={isPending}
            startContent={
              isPending ? (
                <Spinner size="sm" color="white" />
              ) : (
                <MdAdd size={22} />
              )
            }
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
