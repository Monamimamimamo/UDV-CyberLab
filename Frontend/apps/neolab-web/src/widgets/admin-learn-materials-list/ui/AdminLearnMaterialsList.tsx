import { useDeleteLearnMaterials } from '@/entities/admin';
import { LearnMaterialCard } from '@/entities/learn-materials';
import type { LearnMaterialCardDto } from '@/entities/learn-materials/dtos/learn-material-card.dto';
import { UserActionButton } from '@/features/user-actions/ui/UserActionButton';
import { Button } from '@/shared/ui';
import { EmptyLearnMaterialsList } from '@/widgets/learn-materials-list';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import clsx from 'clsx';
import { useState } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

type LearnMaterialActionsProps = {
  learnMaterial: LearnMaterialCardDto;
  closePopover: () => void;
};

export const LearnMaterialActions = ({
  learnMaterial,
  closePopover,
}: LearnMaterialActionsProps) => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useDeleteLearnMaterials();

  const handleDelete = () => {
    mutateAsync(learnMaterial.id).then(() => {
      closePopover();
    });
  };

  const handleEdit = () => {
    closePopover();
    navigate(`/admin/learn-materials/${learnMaterial.id}/edit`);
  };

  return (
    <div className="flex flex-col gap-1">
      <UserActionButton onPress={handleEdit} size="sm" startContent={<MdEdit size={17} />}>
        Редактировать
      </UserActionButton>
      <UserActionButton
        size="sm"
        color="danger"
        className="data-[hover=true]:bg-rose-500/10"
        onPress={handleDelete}
        isLoading={isPending}
        startContent={isPending ? null : <MdDelete size={17} />}
      >
        Удалить
      </UserActionButton>
    </div>
  );
};

interface NewsActionsTriggerProps {
  children: (closePopover: () => void) => React.ReactNode;
}

export const UserDeleteActionsTrigger = ({ children }: NewsActionsTriggerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      radius="sm"
      key="right-start"
      showArrow
      placement="bottom-end"
      classNames={{
        content: 'p-1 overflow-hidden bg-white',
      }}
      isOpen={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger>
        <Button radius="sm" size="sm" isIconOnly>
          <HiOutlineDotsVertical size={22} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>{children(() => setOpen(false))}</PopoverContent>
    </Popover>
  );
};

type LearnMaterialsListProps = {
  learnMaterials: LearnMaterialCardDto[];
};

export const AdminLearnMaterialsList = ({ learnMaterials }: LearnMaterialsListProps) => {
  const navigate = useNavigate();

  if (!learnMaterials.length) {
    return <EmptyLearnMaterialsList />;
  }

  const handleNavigate = (id: string) => {
    navigate(`/admin/learn-materials/${id}`);
  };

  return (
    <>
      <ul className={clsx('grid gap-5 sm:grid-cols-2 md:grid-cols-3')}>
        {learnMaterials.map((item) => (
          <li key={item.id}>
            <LearnMaterialCard
              onClick={() => handleNavigate(item.id)}
              learnMaterial={item}
              actionSlot={
                <UserDeleteActionsTrigger>
                  {(closePopover) => (
                    <LearnMaterialActions learnMaterial={item} closePopover={closePopover} />
                  )}
                </UserDeleteActionsTrigger>
              }
            />
          </li>
        ))}
      </ul>
    </>
  );
};
