import { Badge, Tooltip } from '@heroui/react';
import type { UserCardType } from '../model/types';

import { RiGraduationCapFill } from 'react-icons/ri';
import { FaLock } from 'react-icons/fa';
import { UserImage } from '@/shared/ui';
import clsx from 'clsx';
import { getRoleName } from '../utils/get-role-name';
import { isAdmin, isTeacher } from '../utils/types';

type UserCardProps = {
  user: UserCardType;
  orientation?: 'horizontal' | 'vertical';
  imgSize?: 'sm' | 'md' | 'lg';
  withoutBadge?: boolean;
};

export const UserCard = ({
  user: { userName, email, img, role },
  orientation = 'horizontal',
  imgSize = 'lg',
  withoutBadge = false,
}: UserCardProps) => {
  return (
    <div className="p-1.5">
      <div
        className={clsx(
          'flex gap-[15px]',
          orientation === 'vertical'
            ? 'flex-col items-center justify-center text-center'
            : 'flex-row',
        )}
      >
        {withoutBadge ? (
          <div className="text-center">
            <UserImage username={userName} size={imgSize} radius="lg" src={img} />
          </div>
        ) : (
          <Tooltip
            showArrow
            placement="bottom"
            radius="sm"
            delay={500}
            offset={2}
            closeDelay={0}
            size="sm"
            content={getRoleName(role)}
          >
            <div>
              {isTeacher(role) || isAdmin(role) ? (
                <Badge
                  color={isTeacher(role) ? 'primary' : 'warning'}
                  className="border-white"
                  content={
                    <div>
                      {isTeacher(role) ? (
                        <RiGraduationCapFill className="p-[2px]" size={18} />
                      ) : (
                        <FaLock className="p-[3px]" size={18} />
                      )}
                    </div>
                  }
                >
                  <UserImage
                    isBordered
                    size={imgSize}
                    radius="lg"
                    src={img}
                    username={userName}
                    color={isTeacher(role) ? 'primary' : 'warning'}
                  />
                </Badge>
              ) : (
                <UserImage username={userName} size={imgSize} radius="lg" src={img} />
              )}
            </div>
          </Tooltip>
        )}

        <div className="flex flex-col justify-center">
          <p className="text-[16px] font-bold">{userName}</p>
          <p className="text-foreground/80 text-[12px]">{email}</p>
        </div>
      </div>
    </div>
  );
};
