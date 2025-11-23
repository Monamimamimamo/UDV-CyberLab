import { useAuth, UserCard, useUserStatus } from '@/entities/user';
import { useLogoutModal } from '@/features/logout-modal';
import { Button } from '@/shared/ui';
import { Divider } from '@heroui/react';
import { CiLogout } from 'react-icons/ci';
import { MdAdminPanelSettings } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export const HeaderProfileContent = ({
  setPopoverOpen,
}: {
  setPopoverOpen?: (open: boolean) => void;
}) => {
  const navigate = useNavigate();
  const logout = useLogoutModal(state => state.open);
  const user = useAuth(state => state.user);
  const { isAdmin } = useUserStatus();

  const handleLogout = () => {
    setPopoverOpen?.(false);
    logout();
  };

  const handleAdminPanel = () => {
    setPopoverOpen?.(false);
    navigate('/admin');
  };

  if (!user) return null;

  return (
    <div>
      <UserCard
        user={user}
        // TODO: Image
      />
      {isAdmin && (
        <Button
          onPress={handleAdminPanel}
          startContent={<MdAdminPanelSettings size={22} />}
          type="button"
          fullWidth
          variant="light"
          size="md"
          radius="sm"
        >
          Панель управления
        </Button>
      )}

      <Divider className="my-1 bg-background" />
      <Button
        onPress={handleLogout}
        startContent={<CiLogout size={22} />}
        color="danger"
        className="data-[hover=true]:bg-red-500/10 text-red-500"
        type="button"
        fullWidth
        variant="light"
        size="md"
        radius="sm"
      >
        Выйти
      </Button>
    </div>
  );
};
