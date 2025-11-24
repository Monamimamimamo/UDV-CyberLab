import { useNewsFileSrc } from '@/entities/news';
import type { NewsDetailsDto } from '@/entities/news/dtos/news-details.dto';
import { ProjectStats } from '@/entities/project/ui/ProjectStats';
import { Button, Card, Rating } from '@/shared/ui';
import { Image, Divider } from '@heroui/react';
import { FaArrowRight } from 'react-icons/fa';

export const NewsDetails = ({ details }: { details: NewsDetailsDto }) => {
  const { data: imgSrc, isLoading } = useNewsFileSrc(details.logoPath, details.id);

  return (
    <Card className="w-full">
      <div className="relative">
        <Image
          shadow="sm"
          radius="md"
          isBlurred={true}
          isLoading={isLoading || !imgSrc}
          src={imgSrc || details.logoPath}
          alt={details.name}
          className="pointer-events-none h-[385px] w-full overflow-hidden rounded-[20px] rounded-b-none object-cover object-center shadow-none select-none"
          classNames={{
            wrapper: '!max-w-full shadow-none',
          }}
        />
        <h1 className="bg-secondary/80 absolute right-4 bottom-2 left-4 z-10 max-w-[586px] rounded-sm p-2 text-xl sm:text-2xl">
          {details.name}
        </h1>
      </div>
      <div className="px-4 py-8 sm:px-10 sm:py-12">
        <div className="text-[16px]">{details.description}</div>
        <Divider className="bg-secondary my-4" />
        <div>
          <h5 className="font-bold">Дополнительно:</h5>
          <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <Button
              color="gradient"
              endContent={<FaArrowRight className="-rotate-45 text-[22px]" />}
              onPress={() => window.open(details.url, '_blank')}
            >
              Пройти опрос
            </Button>
            <div className="flex flex-row items-center justify-between gap-7">
              <Rating rating={details.rating} />
              <ProjectStats
                commentsCount={details.commentsCount ?? 0}
                viewsCount={details.viewsCount}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
