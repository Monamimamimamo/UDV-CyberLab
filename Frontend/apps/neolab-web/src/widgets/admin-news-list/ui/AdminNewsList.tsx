import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import type { NewsCardDto } from '@/entities/news/dtos/news-card.dto';
import { NewsCard } from '@/entities/news';
import { EmptyNewsList } from '@/widgets/news-list/ui/EmptyNewsList';
import { MdDelete, MdEdit } from 'react-icons/md';
import { UserActionButton } from '@/features/user-actions/ui/UserActionButton';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/react';
import { useState } from 'react';
import { Button } from '@/shared/ui';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useAdminDeleteNews } from '@/entities/admin';

type CommentActionsProps = {
  newsItem: NewsCardDto;
  closePopover: () => void;
};

export const NewsActions = ({ newsItem, closePopover }: CommentActionsProps) => {
  const { deleteNews, isPending } = useAdminDeleteNews();
  const navigate = useNavigate();

  const handleUserDelete = () => {
    deleteNews(newsItem.id).then(() => {
      closePopover();
    });
  };

  const handleNewsEdit = () => {
    closePopover();
    navigate(`/admin/news/${newsItem.id}/edit`);
  };

  return (
    <div className="flex flex-col gap-1">
      <UserActionButton onPress={handleNewsEdit} size="sm" startContent={<MdEdit size={17} />}>
        Редактировать
      </UserActionButton>
      <UserActionButton
        size="sm"
        color="danger"
        className="data-[hover=true]:bg-rose-500/10"
        onPress={handleUserDelete}
        isLoading={isPending}
        startContent={isPending ? null : <MdDelete size={17} />}
      >
        Удалить
      </UserActionButton>
    </div>
  );
};

interface NewsActionsTriggerProps {
  children: (closePopover: () => void) => React.ReactNode;
}

export const UserDeleteActionsTrigger = ({ children }: NewsActionsTriggerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      radius="sm"
      key="right-start"
      showArrow
      placement="bottom-end"
      classNames={{
        content: 'p-1 overflow-hidden bg-white',
      }}
      isOpen={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger>
        <Button radius="sm" size="sm" isIconOnly>
          <HiOutlineDotsVertical size={22} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>{children(() => setOpen(false))}</PopoverContent>
    </Popover>
  );
};

type NewsListProps = {
  news: NewsCardDto[];
};

export const AdminNewsList = ({ news }: NewsListProps) => {
  const navigate = useNavigate();

  if (!news.length) {
    return <EmptyNewsList />;
  }

  const handleNavigate = (id: string) => {
    navigate(`/admin/news/${id}`);
  };

  return (
    <>
      <ul className={clsx('grid gap-5 sm:grid-cols-2')}>
        {news.map((item) => (
          <li key={item.id}>
            <NewsCard
              onClick={() => handleNavigate(item.id)}
              newsItem={item}
              actionSlot={
                <UserDeleteActionsTrigger>
                  {(closePopover) => <NewsActions newsItem={item} closePopover={closePopover} />}
                </UserDeleteActionsTrigger>
              }
            />
          </li>
        ))}
      </ul>
    </>
  );
};
