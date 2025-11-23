import { useDeleteUserModal } from '@/features/user-delete-modal';
import type { UserInfo } from '@/shared/types';
import { UserActionButton } from './UserActionButton';
import { MdDelete } from 'react-icons/md';

type CommentActionsProps = {
  user: UserInfo;
  closePopover: () => void;
};

export const UserDeleteActions = ({
  user,
  closePopover,
}: CommentActionsProps) => {
  const { open } = useDeleteUserModal();

  // const handleRoleChange = () => {
  //   closePopover();
  // };

  const handleUserDelete = () => {
    closePopover();
    open(user);
  };

  return (
    <div>
      {/* <UserActionButton
        onPress={handleRoleChange}
        isDisabled={true}
        size="sm"
        startContent={<FaUserPen size={17} />}
      >
        Назначить роль
      </UserActionButton>
      <Divider className="my-1 bg-background" /> */}
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
