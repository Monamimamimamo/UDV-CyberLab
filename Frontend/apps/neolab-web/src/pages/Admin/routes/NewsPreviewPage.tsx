import { useSuspenseNewsDetails } from '@/entities/news';
import { BackButton } from '@/shared/ui';
import { NewsDetails } from '@/widgets/news-details';
import { NewsComments } from '@/widgets/news-comments';
import { NewsDetailsActions } from '@/features/news-details-button';
import { NewsRatingModal } from '@/features/news-rating-modal';
import { useParams } from 'react-router-dom';

const NewsPreviewPage = () => {
  const { newsId = '' } = useParams();
  const { data } = useSuspenseNewsDetails(newsId);

  return (
    <section className="mb-20 flex w-full flex-col items-start gap-1 sm:max-w-[712px]">
      <div className="flex w-full flex-row justify-between">
        <BackButton to="/admin/news" />
        <NewsDetailsActions news={data} />
      </div>
      <div className="w-full flex flex-col gap-4">
        <NewsDetails details={data} />
        <NewsComments newsId={data.id} isAdminPage={true} />
      </div>
      <NewsRatingModal />
    </section>
  );
};

export default NewsPreviewPage;
