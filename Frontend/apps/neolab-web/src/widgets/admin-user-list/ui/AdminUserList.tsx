import { type UserInfo } from '@/shared/types';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';

const tableClassNames = {
  wrapper: 'p-2 rounded-md',
  row: 'hover:outline-none',
  th: 'bg-secondary font-bold sm:text-[16px] text-[14px] text-foreground',
  td: 'group-data-[odd=true]:before:bg-secondary sm:text-[16px] text-[14px]',
  tr: 'px-5 outline-none outline-offset-1 outline-4 rounded-md',
};

import { UserDeleteActions, UserDeleteActionsTrigger } from '@/features/user-actions';
import { UserCard, UserChip, useUser } from '@/entities/user';
import { type Key, useCallback } from 'react';

const columns: { name: string; key: Keys }[] = [
  { name: 'Пользователь', key: 'user' },
  { name: 'Тип пользователя', key: 'role' },
  { name: '', key: 'actions' },
] as const;

type Keys = 'user' | 'role' | 'actions';

export const AdminUserList = ({ users }: { users: UserInfo[] }) => {
  const currentUser = useUser();

  const renderCell = useCallback(
    (user: UserInfo, columnKey: Key) =>
      ({
        user: <UserCard withoutBadge imgSize="md" user={user} />,
        role: <UserChip role={user.role} />,
        actions: currentUser?.userId !== user.userId && (
          <div className="flex w-full justify-end">
            <UserDeleteActionsTrigger>
              {(closePopover) => <UserDeleteActions user={user} closePopover={closePopover} />}
            </UserDeleteActionsTrigger>
          </div>
        ),
      })[String(columnKey) as Keys],
    [currentUser],
  );

  return (
    <Table
      shadow="none"
      radius="none"
      classNames={tableClassNames}
      isStriped
      aria-label="Test Answers Overview"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn className="pl-5x sm:pl-[20px]" key={column.key}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users} emptyContent="Пользователи не найдены">
        {(user) => (
          <TableRow key={user.userId}>
            {(columnKey) => (
              <TableCell className="pl-5 sm:pl-[20px]">{renderCell(user, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
