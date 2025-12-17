import { useSuspenseNewsDetails } from '@/entities/news';
import { BackButton } from '@/shared/ui';
import { NewsDetails } from '@/widgets/news-details';
import { NewsComments } from '@/widgets/news-comments';
import { NewsCommentForm } from '@/widgets/news-comment-form';
import { NewsRatingModal } from '@/features/news-rating-modal';
import { NewsDetailsActions } from '@/features/news-details-button';
import { useParams } from 'react-router-dom';

const NewsPreviewPage = () => {
  const { newsId = '' } = useParams();
  const { data } = useSuspenseNewsDetails(newsId);

  return (
    <section className="mx-auto mt-6 mb-20 flex w-full flex-col items-start gap-1 sm:max-w-[712px]">
      <div className="flex w-full flex-row justify-between">
        <BackButton to="/news" />
        <NewsDetailsActions news={data} />
      </div>
      <div className="flex w-full flex-col gap-4">
        <NewsDetails details={data} />
        <div className="flex w-full flex-col gap-2">
          <NewsCommentForm newsId={data.id} />
        </div>
        <NewsComments newsId={data.id} />
      </div>
      <NewsRatingModal />
    </section>
  );
};

export default NewsPreviewPage;
