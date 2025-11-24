import { useSuspenseNewsDetails } from '@/entities/news';
import { BackButton } from '@/shared/ui';
import { NewsDetails } from '@/widgets/news-details';
import { useParams } from 'react-router-dom';

const NewsPreviewPage = () => {
  const { newsId = '' } = useParams();
  const { data } = useSuspenseNewsDetails(newsId);

  return (
    <section className="mb-20 flex w-full flex-col items-start gap-1 sm:max-w-[712px]">
      <div className="mb-2 flex w-full flex-row justify-between">
        <BackButton to="/admin/news" />
      </div>
      <div className="w-full">
        <NewsDetails details={data} />
        {/* TODO Комментарии/Рейтинг */}
      </div>
    </section>
  );
};

export default NewsPreviewPage;
