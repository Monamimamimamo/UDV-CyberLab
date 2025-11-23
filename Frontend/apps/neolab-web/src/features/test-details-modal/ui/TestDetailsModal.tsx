import { useTestDetailsModalStore } from '../model/store';
import { Modal } from '@/shared/ui';
import { TestDetailsContent } from './TestDetailsContent';

export const TestDetailsModal = () => {
  const { isOpen, close, setOpen, options } = useTestDetailsModalStore();

  if (!options?.testId) return null;

  const handleClose = () => {
    setTimeout(close, 300);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setOpen}
      onClose={handleClose}
      size="lg"
    >
      <TestDetailsContent testId={options.testId} />
    </Modal>
  );
};
