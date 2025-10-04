import { Modal } from '@/shared/ui';
import { useProjectEditModal } from '../model/store';
import { ProjectModalContent } from './ProjectModalContent';

export const ProjectEditModal = () => {
  const { isOpen, setOpen } = useProjectEditModal();

  return (
    <Modal
      placement="top"
      isOpen={isOpen}
      onOpenChange={setOpen}
      size="lg"
      classNames={{
        wrapper: 'without-scrollbar',
      }}
    >
      <ProjectModalContent />
    </Modal>
  );
};
