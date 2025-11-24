import { useQueryState } from 'nuqs';
import { NewsList } from './NewsList';
import { useNewsList } from '@/entities/news';
import { ProjectSorting } from '@/entities/sorting';

export const NewsListWithQuery = () => {
  const [sort] = useQueryState('sort', { defaultValue: '' });
  const [search] = useQueryState('search', { defaultValue: '' });

  const { data } = useNewsList({
    sortOrder: ProjectSorting[sort as keyof typeof ProjectSorting],
    search,
  });

  return <NewsList news={data} />;
};
