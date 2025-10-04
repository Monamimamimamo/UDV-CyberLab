import { MdAdd } from 'react-icons/md';
import { useUserStatus } from '@/entities/user';
import { Button } from '@/shared/ui';
import { useProjectEditModal } from '@/features/project-edit-modal';

export const EmptyProjectList = () => {
  const { isTeacher } = useUserStatus();
  const open = useProjectEditModal(state => state.open);

  return (
    <div className="flex justify-center mt-2 w-full">
      <div className="max-w-[400px] w-full flex flex-col items-center">
        <p className="text-foreground font-w3ip text-3xl bg-main-gradient text-transparent bg-clip-text">
          404
        </p>
        <p className="text-second mb-3">Проекты не найдены</p>
        {isTeacher && (
          <Button
            startContent={<MdAdd size={22} />}
            size="md"
            radius="sm"
            className="bg-foreground/5 text-foreground/90 font-semibold"
            variant="light"
            onPress={() => open({ isEditing: false })}
          >
            Добавить проект
          </Button>
        )}
      </div>
    </div>
  );
};
