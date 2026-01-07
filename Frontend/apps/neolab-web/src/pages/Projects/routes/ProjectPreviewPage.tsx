import { useParams } from 'react-router-dom';
import { ProjectDetailsCard, useSuspenseProjectDetails } from '@/entities/project';
import { BackButton } from '@/shared/ui';
import { ProjectDetailsActions } from '@/features/project-details-button';
import { ProjectRatingModal } from '@/features/project-rating-modal';
import { Comments } from '@/widgets/comments';
import { CommentForm } from '@/features/comment-form';

const ProjectPreviewPage = () => {
  const { projectId = '' } = useParams();
  const { data } = useSuspenseProjectDetails(projectId);

  return (
    <section className="mb-20 flex w-full flex-col items-start gap-1 sm:max-w-[712px]">
      <div className="flex w-full flex-row justify-between">
        <BackButton />
        <ProjectDetailsActions project={data} />
      </div>
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-2">
          <ProjectDetailsCard project={data} />
          <CommentForm entityId={data.id} entityKey="projects" />
        </div>
        <Comments entityId={data.id} entityKey="projects" />
      </div>
      <ProjectRatingModal />
    </section>
  );
};

export default ProjectPreviewPage;
