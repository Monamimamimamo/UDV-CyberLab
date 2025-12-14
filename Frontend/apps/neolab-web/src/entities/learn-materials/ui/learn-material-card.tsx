import { Card } from '@/shared/ui';
import { Image } from '@heroui/react';
import { useCallback } from 'react';
import { useLearnMaterialFileSrc } from '../api/learn-materials.queries';
import type { LearnMaterialCardDto } from '../dtos/learn-material-card.dto';

type LearnMaterialCardProps = {
  onClick?: () => void;
  learnMaterial: LearnMaterialCardDto;
  actionSlot?: React.ReactNode;
};

export const LearnMaterialCard = ({
  learnMaterial,
  onClick,
  actionSlot,
}: LearnMaterialCardProps) => {
  const { data: imgSrc, isLoading } = useLearnMaterialFileSrc(
    learnMaterial.logoPath,
    learnMaterial.id,
  );

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
        src={imgSrc || learnMaterial.logoPath}
        alt={learnMaterial.name}
        className="pointer-events-none h-[220px] w-full overflow-hidden rounded-b-none object-cover object-center shadow-none"
        classNames={{
          wrapper: '!max-w-full shadow-none',
        }}
      />
      <div className="flex h-full flex-col gap-[10px] px-4 py-4">
        <div>
          <p className="line-clamp-2 text-sm font-medium">{learnMaterial.name}</p>
          <p className="mt-1 line-clamp-3 text-xs">{learnMaterial.shortDescription}</p>
        </div>
        <div className="absolute top-2 right-2 z-10">{actionSlot}</div>
      </div>
    </Card>
  );
};
