import { useProjectList } from '@/entities/project';
import { ProjectSorting } from '@/entities/sorting';
import { AdminProjectList } from './AdminProjectList';

export const AdminProjectListWithQuery = ({ search }: { search?: string }) => {
  const { data } = useProjectList({
    sortOrder: ProjectSorting.high_views,
    search,
  });

  return <AdminProjectList projects={data} />;
};
