import { Modal, ModalContent } from '@/shared/ui';
import { useChangeUserRoleModal } from '../model/store';
import { UserChangeRoleForm } from './UserChangeRoleForm';

export const UserChangeRoleModal = () => {
  const { isOpen, setOpen } = useChangeUserRoleModal();

  return (
    <Modal placement="center" isOpen={isOpen} onOpenChange={setOpen} size="md">
      <ModalContent>
        <UserChangeRoleForm />
      </ModalContent>
    </Modal>
  );
};
