import type { NewsDetailsDto } from '@/entities/news/dtos/news-details.dto';
import { ActionButton } from '@/shared/ui';
import { IoStarSharp } from 'react-icons/io5';
import { useNewsRatingModal } from '@/features/news-rating-modal';

export const NewsDetailsActions = ({
  news,
}: {
  news: Pick<NewsDetailsDto, 'id'>;
}) => {
  const open = useNewsRatingModal(state => state.open);

  const handleOpenRatingModal = () => {
    open({ newsId: news.id });
  };

  return (
    <div className="flex flex-row gap-1">
      <ActionButton
        className="text-2xl bg-yellow-500/30 text-yellow-500 border-yellow/30"
        onPress={handleOpenRatingModal}
        label="Оценить новость"
        icon={IoStarSharp}
      />
    </div>
  );
};

