import { Modal } from '@/shared/ui';
import { useProjectRatingModal } from '../model/store';
import { ProjectRatingModalContent } from './ProjectRatingModalContent';

export const ProjectRatingModal = () => {
  const { isOpen, setOpen } = useProjectRatingModal();

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
      <ProjectRatingModalContent />
    </Modal>
  );
};
