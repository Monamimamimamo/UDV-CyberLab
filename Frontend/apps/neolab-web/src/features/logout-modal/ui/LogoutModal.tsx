import { Button, Modal, ModalBody, ModalContent } from '@/shared/ui';
import { useLogoutModal } from '../model/store';
import { useAuth, UserCard, useUser } from '@/entities/user';
import { Divider } from '@heroui/react';

export const LogoutModal = () => {
  const user = useUser();
  const { isOpen, setOpen } = useLogoutModal();
  const logout = useAuth(state => state.logout);

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  const handleReturn = () => {
    setOpen(false);
  };

  return (
    <Modal placement="center" isOpen={isOpen} onOpenChange={setOpen} size="md">
      <ModalContent>
        <ModalBody className="py-5 px-10">
          <div>
            <p className="text-[22px] text-center">Выйти из аккаунта?</p>
            {user && (
              <div className="mt-4">
                <UserCard user={user} orientation="vertical" />
              </div>
            )}
          </div>
          <div className="flex flex-row gap-4 items-center justify-center">
            <Button
              color="danger"
              size="md"
              radius="sm"
              className="w-1/2 text-white bg-red-500"
              onPress={handleLogout}
            >
              Выйти
            </Button>
            <Divider orientation="vertical" className="h-12 bg-foreground/30" />

            <Button
              className="w-1/2"
              size="md"
              radius="sm"
              variant="bordered"
              onPress={handleReturn}
            >
              Отмена
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
