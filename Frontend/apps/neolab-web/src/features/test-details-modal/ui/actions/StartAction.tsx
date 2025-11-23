import { useTestStart } from '@/entities/test-passing';
import { useNavigation } from '@/shared/hooks';
import { Button } from '@/shared/ui';
import { useModalCloseHandler } from '../../model/hooks/useCloseHandler';

export const StartAction = ({ testId }: { testId: string }) => {
  const { mutateAsync: startTest, isPending } = useTestStart();
  const closeHandler = useModalCloseHandler();
  const { scrollNavigate } = useNavigation();

  const handleStart = () => {
    startTest(testId).then(() => scrollNavigate(`/tests/${testId}`));
  };

  return (
    <div className="flex justify-center">
      <Button
        isDisabled={isPending}
        color="gradient"
        className="sm:w-auto w-full sm:px-8 px-2"
        onPress={closeHandler(handleStart)}
      >
        Начать прохождение
      </Button>
    </div>
  );
};
