import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import type { NewsCardDto } from '@/entities/news/dtos/news-card.dto';
import { EmptyNewsList } from './EmptyNewsList';
import { NewsCard } from '@/entities/news';

type NewsListProps = {
  news: NewsCardDto[];
};

export const NewsList = ({ news }: NewsListProps) => {
  const navigate = useNavigate();

  if (!news.length) {
    return <EmptyNewsList />;
  }

  const handleNavigate = (id: string) => {
    navigate(`/news/${id}`);
  };

  return (
    <>
      <ul className={clsx('grid gap-5 sm:grid-cols-2 md:grid-cols-3')}>
        {news.map((item) => (
          <li key={item.id}>
            <NewsCard onClick={() => handleNavigate(item.id)} newsItem={item} />
          </li>
        ))}
      </ul>
    </>
  );
};
