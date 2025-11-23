import { UserRole } from '@/shared/types';
import { Chip } from '@heroui/react';
import clsx from 'clsx';
import { getRoleName } from '../utils/get-role-name';

const styles = {
  [UserRole.STUDENT]: 'bg-blue-400/20 text-blue-500',
  [UserRole.TEACHER]: 'bg-green-500/20 text-green-500',
  [UserRole.ADMIN]: 'bg-red-500/20 text-red-500',
};

export const UserChip = ({ role }: { role: UserRole }) => {
  return (
    <Chip size="sm" className={clsx(styles[role])}>
      {getRoleName(role)}
    </Chip>
  );
};
