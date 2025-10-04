import { Card, Rating } from '@/shared/ui';
import type { ProjectCardDTO } from '../model/dto/ProjectCardDTO';
import { ProjectStats } from './ProjectStats';
import { Image } from '@heroui/react';
import { useCallback, useMemo } from 'react';
import { useMediaQuery } from '@/shared/hooks';
import { useFileSrc } from '../api/queries/useFileSrc';

type ProjectCardProps = {
  onClick?: () => void;
  project: ProjectCardDTO;
  actionSlot?: React.ReactNode;
  type: 'row' | 'card';
};

export const ProjectCard = ({
  project,
  onClick,
  type,
  actionSlot,
}: ProjectCardProps) => {
  const { data: imgSrc, isLoading } = useFileSrc(project.logoPath, project.id);
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        onClick?.();
      }
    },
    [onClick]
  );

  const isRow = useMemo(() => type === 'row', [type]);

  if (isRow && !isMobile) {
    return (
      <Card
        tabIndex={0}
        onClick={onClick}
        onKeyDown={handleKeyPress}
        className="drop-shadow-base hover:bg-white/80 transition-colors cursor-pointer custom-outline py-[22px] px-[30px] rounded-[12px] h-[207px] w-full"
      >
        <div className="flex flex-row gap-5 h-full">
          <div className="h-[160px] max-w-[160px] w-full">
            <Image
              shadow="sm"
              radius="md"
              isLoading={isLoading || !imgSrc}
              isBlurred={true}
              src={imgSrc}
              alt={project.name}
              className="overflow-hidden object-cover object-center h-full w-full"
              classNames={{
                wrapper: '!max-w-[160px] h-full',
              }}
            />
          </div>

          <div className="flex flex-col w-full">
            <p className="font-medium text-sm mb-4">{project.name}</p>
            <p className="text-xs line-clamp-6">{project.shortDescription}</p>
            <div className="mt-auto flex flex-row justify-between items-center">
              <p className="text-xs">Автор: {project.ownerName}</p>
              <div className="flex flex-row gap-7 justify-between items-center">
                <Rating rating={project.rating} />
                <ProjectStats
                  commentsCount={project.commentsCount}
                  viewsCount={project.viewsCount}
                />
              </div>
            </div>
          </div>
          <div className="absolute top-2 right-2">{actionSlot}</div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyPress}
      className="drop-shadow-base hover:bg-white/80 transition-colors cursor-pointer custom-outline py-[10px] px-[24px] rounded-[12px] md:h-[331px] h-[430px] w-full relative"
    >
      <div className="flex flex-col gap-[10px] h-full">
        <p className="font-medium text-sm text-center line-clamp-1">
          {project.name}
        </p>
        <Image
          shadow="sm"
          radius="md"
          isBlurred={true}
          isLoading={isLoading || !imgSrc}
          src={imgSrc || project.logoPath}
          alt={project.name}
          className="w-full md:h-[160px] sm:h-[220px] h-[260px] overflow-hidden object-cover object-center"
          classNames={{
            wrapper: '!max-w-full',
          }}
        />

        <p className="text-xs line-clamp-4">{project.shortDescription}</p>
        <div className="mt-auto flex flex-col">
          <p className="text-xs line-clamp-4">Автор: {project.ownerName}</p>
          <div className="flex justify-between items-center">
            <Rating rating={project.rating} />
            <ProjectStats
              commentsCount={project.commentsCount}
              viewsCount={project.viewsCount}
            />
          </div>
        </div>
        <div className="absolute top-2 right-2 z-10">{actionSlot}</div>
      </div>
    </Card>
  );
};
