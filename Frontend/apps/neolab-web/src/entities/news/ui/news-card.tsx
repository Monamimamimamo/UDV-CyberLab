import { Card, Rating } from '@/shared/ui';
import { Image } from '@heroui/react';
import { useCallback } from 'react';
import type { NewsCardDto } from '../dtos/news-card.dto';
import { useNewsFileSrc } from '../api/news.queries';
import { ProjectStats } from '@/entities/project/ui/ProjectStats';

type ProjectCardProps = {
  onClick?: () => void;
  newsItem: NewsCardDto;
  actionSlot?: React.ReactNode;
};

export const NewsCard = ({ newsItem, onClick, actionSlot }: ProjectCardProps) => {
  const { data: imgSrc, isLoading } = useNewsFileSrc(newsItem.logoPath, newsItem.id);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        onClick?.();
      }
    },
    [onClick],
  );

  return (
    <Card
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyPress}
      className="drop-shadow-base custom-outline relative flex h-[382px] w-full cursor-pointer flex-col overflow-hidden rounded-[12px] p-0 transition-colors hover:bg-white/80"
    >
      <Image
        shadow="sm"
        radius="md"
        isBlurred={true}
        isLoading={isLoading || !imgSrc}
        src={imgSrc || newsItem.logoPath}
        alt={newsItem.name}
        className="pointer-events-none h-[220px] w-full overflow-hidden rounded-b-none object-cover object-center shadow-none"
        classNames={{
          wrapper: '!max-w-full shadow-none',
        }}
      />
      <div className="flex h-full flex-col gap-[10px] px-4 py-4">
        <div>
          <p className="line-clamp-2 text-sm font-medium">{newsItem.name}</p>
          <p className="mt-1 line-clamp-3 text-xs">{newsItem.shortDescription}</p>
        </div>
        <div className="mt-auto flex flex-col">
          <div className="flex items-center justify-between">
            <Rating rating={newsItem.rating} />
            <ProjectStats
              commentsCount={newsItem?.commentsCount ?? 0}
              viewsCount={newsItem.viewsCount}
            />
          </div>
        </div>
        <div className="absolute top-2 right-2 z-10">{actionSlot}</div>
      </div>
    </Card>
  );
};
