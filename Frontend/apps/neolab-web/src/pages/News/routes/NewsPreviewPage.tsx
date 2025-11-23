import { useParams } from 'react-router-dom';

const NewsPreviewPage = () => {
  const { newsId = '' } = useParams();

  return (
    <section className="mb-20 flex w-full flex-col items-start gap-1 sm:max-w-[712px]">
      {newsId}
    </section>
  );
};

export default NewsPreviewPage;
