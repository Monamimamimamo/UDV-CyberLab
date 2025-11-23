import { ModalBody, ModalContent } from '@heroui/react';
import { useProjectRatingModal } from '../model/store';
import { useUserProjectRating } from '@/entities/rating';
import { ModalSpinner } from '@/shared/ui';
import { GetRatingContent } from './GetRatingContent';
import { SetRatingContent } from './SetRatingContent';

export const ProjectRatingModalContent = () => {
  const { options } = useProjectRatingModal();
  const { data, isPending } = useUserProjectRating(options?.projectId || '');

  if (isPending || !options?.projectId) {
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
          <GetRatingContent data={data} />
        </ModalBody>
      </ModalContent>
    );
  }

  return (
    <ModalContent>
      <ModalBody>
        <SetRatingContent projectId={options.projectId} />
      </ModalBody>
    </ModalContent>
  );
};
