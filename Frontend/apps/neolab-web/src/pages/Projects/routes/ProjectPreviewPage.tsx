import { useParams } from 'react-router-dom';
import {
  ProjectDetailsCard,
  useSuspenseProjectDetails,
} from '@/entities/project';
import { BackButton } from '@/shared/ui';
import { ProjectDetailsActions } from '@/features/project-details-button';
import { ProjectComments } from '@/widgets/project-comments';
import { ProjectCommentForm } from '@/widgets/project-comment-form';
import { ProjectRatingModal } from '@/features/project-rating-modal';

const ProjectPreviewPage = () => {
  const { projectId = '' } = useParams();
  const { data } = useSuspenseProjectDetails(projectId);

  return (
    <section className="w-full sm:max-w-[712px] flex flex-col gap-1 items-start mb-20">
      <div className="flex flex-row justify-between w-full">
        <BackButton />
        <ProjectDetailsActions project={data} />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2 w-full">
          <ProjectDetailsCard project={data} />
          <ProjectCommentForm projectId={data.id} />
        </div>
        <ProjectComments projectId={data.id} />
      </div>
      <ProjectRatingModal />
    </section>
  );
};

export default ProjectPreviewPage;
