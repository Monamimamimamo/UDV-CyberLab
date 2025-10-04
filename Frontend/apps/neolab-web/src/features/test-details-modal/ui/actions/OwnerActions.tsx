import { Divider } from '@heroui/react';
import { Button } from '@/shared/ui';
import { useNavigation } from '@/shared/hooks';
import { useModalCloseHandler } from '../../model/hooks/useCloseHandler';

export const OwnerActions = ({ testId }: { testId: string }) => {
  const closeHandler = useModalCloseHandler();
  const { scrollNavigate } = useNavigation();

  const handleViewStatistics = () => {
    scrollNavigate(`/tests/manage/${testId}/statistics`);
  };

  const handleEdit = () => {
    scrollNavigate(`/tests/manage/${testId}/edit`);
  };

  return (
    <div className="flex sm:flex-row flex-col sm:gap-4 gap-2 items-center justify-center sm:px-10 px-2">
      <Button
        color="gradient"
        className="sm:w-1/2 w-full"
        onPress={closeHandler(handleEdit)}
      >
        Редактировать
      </Button>
      <Divider
        orientation="vertical"
        className="h-16 bg-foreground/30 sm:block hidden"
      />
      <Button
        className="sm:w-1/2 w-full"
        variant="bordered"
        onPress={closeHandler(handleViewStatistics)}
      >
        Посмотреть статистику
      </Button>
    </div>
  );
};
