import { useNavigation } from '@/shared/hooks';
import { Button } from '@/shared/ui';
import { useModalCloseHandler } from '../../model/hooks/useCloseHandler';

export const ResumeAction = ({ testId }: { testId: string }) => {
  const closeHandler = useModalCloseHandler();
  const { scrollNavigate } = useNavigation();

  const handleResume = () => {
    scrollNavigate(`/tests/${testId}`);
  };

  return (
    <div className="flex justify-center">
      <Button
        color="gradient"
        className="sm:w-auto w-full sm:px-8 px-2"
        onPress={closeHandler(handleResume)}
      >
        Продолжить прохождение
      </Button>
    </div>
  );
};
