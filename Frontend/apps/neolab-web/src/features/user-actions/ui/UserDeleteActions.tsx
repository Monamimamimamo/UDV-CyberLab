import { useDeleteUserModal } from '@/features/user-delete-modal';
import { useChangeUserRoleModal } from '@/features/user-change-role-modal';
import type { UserInfo } from '@/shared/types';
import { UserActionButton } from './UserActionButton';
import { MdDelete } from 'react-icons/md';
import { FaUserPen } from 'react-icons/fa6';
import { Divider } from '@heroui/react';

type CommentActionsProps = {
  user: UserInfo;
  closePopover: () => void;
};

export const UserDeleteActions = ({
  user,
  closePopover,
}: CommentActionsProps) => {
  const { open: openDeleteModal } = useDeleteUserModal();
  const { open: openChangeRoleModal } = useChangeUserRoleModal();

  const handleRoleChange = () => {
    closePopover();
    openChangeRoleModal(user);
  };

  const handleUserDelete = () => {
    closePopover();
    openDeleteModal(user);
  };

  return (
    <div>
      <UserActionButton
        onPress={handleRoleChange}
        size="sm"
        startContent={<FaUserPen size={17} />}
      >
        Сменить роль
      </UserActionButton>
      <Divider className="my-1 bg-background" />
      <UserActionButton
        size="sm"
        onPress={handleUserDelete}
        startContent={<MdDelete size={17} />}
        color="danger"
        className="data-[hover=true]:bg-rose-500/10"
      >
        Удалить
      </UserActionButton>
    </div>
  );
};
