import { useLearnMaterialList } from '@/entities/learn-materials';
import { ProjectSorting } from '@/entities/sorting';
import { useQueryState } from 'nuqs';
import { AdminLearnMaterialsList } from './AdminLearnMaterialsList';

export const AdminLearnMaterialsListWithQuery = () => {
  const [sort] = useQueryState('sort', { defaultValue: '' });
  const [search] = useQueryState('search', { defaultValue: '' });

  const { data } = useLearnMaterialList({
    sortOrder: ProjectSorting[sort as keyof typeof ProjectSorting],
    search,
  });

  return <AdminLearnMaterialsList learnMaterials={data} />;
};
