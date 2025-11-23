import { Divider } from '@heroui/react';
import { ToolButton } from './ToolButton';
import { MdModeEdit, MdDelete, MdSettings } from 'react-icons/md';
import { IoStatsChart } from 'react-icons/io5';
import { IoMdList } from 'react-icons/io';
import { useNavigation } from '@/shared/hooks';
import { useDeleteTest } from '@/entities/test-info';
import { Spinner } from '@/shared/ui';

export const ToolsContent = ({ id }: { id: string }) => {
  const { mutate, isPending } = useDeleteTest();
  const { scrollNavigate } = useNavigation();

  return (
    <div>
      <div>
        <ToolButton
          onPress={() => scrollNavigate(`/tests/manage/${id}/statistics`)}
          startContent={<IoStatsChart size={17} />}
        >
          Статистика
        </ToolButton>
      </div>
      <Divider className="my-1 bg-background" />
      <div className="flex flex-col gap-0.5">
        <ToolButton
          onPress={() => scrollNavigate(`/tests/manage/${id}/edit`)}
          startContent={<MdModeEdit size={17} />}
        >
          Редактировать
        </ToolButton>
        <ToolButton
          onPress={() => scrollNavigate(`/tests/manage/${id}/settings`)}
          startContent={<MdSettings size={17} />}
        >
          Настройки
        </ToolButton>
        <ToolButton
          onPress={() => scrollNavigate(`/tests/manage/${id}/preview`)}
          startContent={<IoMdList size={17} />}
        >
          Предпросмотр
        </ToolButton>
      </div>
      <Divider className="my-1 bg-background" />
      <div>
        <ToolButton
          isDisabled={isPending}
          onPress={() => mutate(id)}
          startContent={
            isPending ? (
              <Spinner size="sm" color="danger" />
            ) : (
              <MdDelete size={17} />
            )
          }
          color="danger"
          className="data-[hover=true]:bg-rose-500/10"
        >
          Удалить
        </ToolButton>
      </div>
    </div>
  );
};
