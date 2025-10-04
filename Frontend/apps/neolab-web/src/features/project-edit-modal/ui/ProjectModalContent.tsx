import { ModalContent } from '@/shared/ui';
import { useProjectEditModal } from '../model/store';
import { ModalProjectCreate } from './CreateProjectContent';
import { ModalProjectEdit } from './EditProjectContent';

export const ProjectModalContent = () => {
  const { options } = useProjectEditModal();

  if (!options?.projectId || !options.isEditing) {
    return (
      <ModalContent>
        <ModalProjectCreate />
      </ModalContent>
    );
  }

  return (
    <ModalContent>
      <ModalProjectEdit projectId={options.projectId} />
    </ModalContent>
  );
};
