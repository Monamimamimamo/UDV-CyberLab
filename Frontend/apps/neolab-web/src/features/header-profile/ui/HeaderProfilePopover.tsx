import { Button, UserImage } from '@/shared/ui';
import { Avatar, Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import { HeaderProfileContent } from './HeaderProfileContent';
import { useState } from 'react';
import { useProfile } from '@/entities/user';

export const HeaderProfile = () => {
  const [open, setOpen] = useState(false);
  const { isPending, data } = useProfile();

  return (
    <>
      {isPending ? (
        <div className="h-[50px] w-[50px] flex justify-center items-center">
          <Avatar
            fallback={
              <div className="animate-pulse bg-gradient-to-r from-foreground/30 to-second/30 h-[100px] w-[100px]" />
            }
            showFallback={isPending}
            isBordered
            className="transition-transform"
          />
        </div>
      ) : (
        <Popover
          isOpen={open}
          onOpenChange={setOpen}
          radius="sm"
          key="bottom-end"
          placement="bottom-end"
          classNames={{
            content: 'p-1 overflow-hidden bg-white',
          }}
        >
          <PopoverTrigger>
            <Button
              type="button"
              variant="light"
              radius="sm"
              className="min-w-0 w-[50px] h-[50px] p-1"
            >
              <UserImage
                username={data.userName}
                // TODO Аватарка для профиля
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="z-0">
            <HeaderProfileContent setPopoverOpen={setOpen} />
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};
