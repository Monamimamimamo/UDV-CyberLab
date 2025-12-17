import { Modal } from '@/shared/ui';
import { useNewsRatingModal } from '../model/store';
import { NewsRatingModalContent } from './NewsRatingModalContent';

export const NewsRatingModal = () => {
  const { isOpen, setOpen } = useNewsRatingModal();

  return (
    <Modal
      placement="center"
      isOpen={isOpen}
      onOpenChange={setOpen}
      size="lg"
      classNames={{
        wrapper: 'without-scrollbar',
      }}
    >
      <NewsRatingModalContent />
    </Modal>
  );
};

