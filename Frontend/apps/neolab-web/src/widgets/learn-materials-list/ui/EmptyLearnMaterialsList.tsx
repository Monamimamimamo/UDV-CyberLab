import { useUserStatus } from '@/entities/user';
import { Button } from '@/shared/ui';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export const EmptyLearnMaterialsList = () => {
  const { isAdmin } = useUserStatus();

  const navigate = useNavigate();

  const onClick = () => {
    navigate('/admin/learn-materials/create');
  };

  return (
    <div className="mt-2 flex w-full justify-center">
      <div className="flex w-full max-w-[400px] flex-col items-center">
        <p className="text-foreground font-w3ip bg-main-gradient bg-clip-text text-3xl text-transparent">
          404
        </p>
        <p className="text-second mb-3">Учебные материалы не найдены</p>
        {isAdmin && (
          <Button
            startContent={<MdAdd size={22} />}
            size="md"
            radius="sm"
            className="bg-foreground/5 text-foreground/90 font-semibold"
            variant="light"
            onPress={onClick}
          >
            Добавить материал
          </Button>
        )}
      </div>
    </div>
  );
};
