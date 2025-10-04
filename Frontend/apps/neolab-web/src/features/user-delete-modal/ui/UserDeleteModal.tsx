import { Modal, ModalContent } from '@/shared/ui';
import { useDeleteUserModal } from '../model/store';
import { UserDeleteForm } from './UserDeleteForm';

export const UserDeleteModal = () => {
  const { isOpen, setOpen } = useDeleteUserModal();

  return (
    <Modal placement="center" isOpen={isOpen} onOpenChange={setOpen} size="md">
      <ModalContent>
        <UserDeleteForm />
      </ModalContent>
    </Modal>
  );
};
