import { useQueryState } from 'nuqs';
import { useNewsList } from '@/entities/news';
import { ProjectSorting } from '@/entities/sorting';
import { AdminNewsList } from './AdminNewsList';

export const AdminNewsListWithQuery = () => {
  const [sort] = useQueryState('sort', { defaultValue: '' });
  const [search] = useQueryState('search', { defaultValue: '' });

  const { data } = useNewsList({
    sortOrder: ProjectSorting[sort as keyof typeof ProjectSorting],
    search,
  });

  return <AdminNewsList news={data} />;
};
