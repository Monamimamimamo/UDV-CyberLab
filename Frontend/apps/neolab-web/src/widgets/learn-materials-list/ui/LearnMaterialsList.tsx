import { LearnMaterialCard } from '@/entities/learn-materials';
import type { LearnMaterialCardDto } from '@/entities/learn-materials/dtos/learn-material-card.dto';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { EmptyLearnMaterialsList } from './EmptyLearnMaterialsList';

type LearnMaterialsListProps = {
  learnMaterials: LearnMaterialCardDto[];
};

export const LearnMaterialsList = ({ learnMaterials }: LearnMaterialsListProps) => {
  const navigate = useNavigate();

  if (!learnMaterials.length) {
    return <EmptyLearnMaterialsList />;
  }

  const handleNavigate = (id: string) => {
    navigate(`/learn-materials/${id}`);
  };

  return (
    <>
      <ul className={clsx('grid gap-5 sm:grid-cols-2 md:grid-cols-3')}>
        {learnMaterials.map((item) => (
          <li key={item.id}>
            <LearnMaterialCard learnMaterial={item} onClick={() => handleNavigate(item.id)} />
          </li>
        ))}
      </ul>
    </>
  );
};
