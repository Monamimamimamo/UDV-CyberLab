import { ModalBody, ModalContent } from '@heroui/react';
import { useNewsRatingModal } from '../model/store';
import { useUserNewsRating } from '@/entities/rating';
import { ModalSpinner } from '@/shared/ui';
import { GetNewsRatingContent } from './GetNewsRatingContent';
import { SetNewsRatingContent } from './SetNewsRatingContent';

export const NewsRatingModalContent = () => {
  const { options } = useNewsRatingModal();
  const { data, isPending } = useUserNewsRating(options?.newsId || '');

  if (isPending || !options?.newsId) {
    return (
      <ModalContent>
        <ModalSpinner />
      </ModalContent>
    );
  }

  if (data?.userRating) {
    return (
      <ModalContent>
        <ModalBody>
          <GetNewsRatingContent data={data} />
        </ModalBody>
      </ModalContent>
    );
  }

  return (
    <ModalContent>
      <ModalBody>
        <SetNewsRatingContent newsId={options.newsId} />
      </ModalBody>
    </ModalContent>
  );
};

