import { useLearnMaterialFileSrc } from '@/entities/learn-materials/api/learn-materials.queries';
import type { LearnMaterialDetailsDto } from '@/entities/learn-materials/dtos/learn-material-details.dto';
import { Card } from '@/shared/ui';
import { Chip, Divider, Image } from '@heroui/react';

const getMaterialType = (type: string) =>
  ({
    video: 'Видео',
    article: 'Статья',
    document: 'Документ',
  }[type]);

export const LearnMaterialDetails = ({ details }: { details: LearnMaterialDetailsDto }) => {
  const { data: imgSrc, isLoading } = useLearnMaterialFileSrc(details.logoPath, details.id);
  const materialType = getMaterialType(details.publicationType ?? '');
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
          className="pointer-events-none h-[220px] w-full overflow-hidden rounded-[20px] rounded-b-none object-cover object-center shadow-none select-none"
          classNames={{
            wrapper: '!max-w-full shadow-none',
          }}
        />
        <h1 className="bg-secondary/80 absolute right-4 bottom-2 left-4 z-10 max-w-[586px] rounded-sm p-2 text-xl sm:text-2xl">
          {details.name}
        </h1>
        {materialType && (
          <Chip color="primary" className="absolute left-4 -bottom-5">{materialType}</Chip>
        )}
      </div>
      <div className="px-4 py-8 sm:px-10 sm:py-12">
        <div className="text-[16px] mb-4">{details.description}</div>
        <Divider className="bg-secondary my-4" />
        <div>
          <h5 className="font-bold">Подробнее:</h5>
          <a href={details.url} target="_blank" rel="noopener noreferrer" className="text-link text-sm underline mt-2 inline-block">Перейти к материалу</a>
        </div>
      </div>
    </Card>
  );
}

