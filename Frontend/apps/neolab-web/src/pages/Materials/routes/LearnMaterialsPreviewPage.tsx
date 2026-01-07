import { useParams } from 'react-router-dom';
import { useSuspenseLearnMaterialDetails } from '@/entities/learn-materials';
import { CommentForm } from '@/features/comment-form';
import { BackButton } from '@/shared/ui';
import { Comments } from '@/widgets/comments';
import { LearnMaterialDetails } from '@/widgets/learn-materials-details';

const LearnMaterialsPreviewPage = () => {
  const { materialId = '' } = useParams();
  const { data } = useSuspenseLearnMaterialDetails(materialId);

  return (
    <section className="mx-auto mt-6 mb-20 flex w-full flex-col items-start gap-1 sm:max-w-[712px]">
      <div className="flex w-full flex-row justify-between">
        <BackButton to="/learn-materials" />
      </div>
      <div className="flex w-full flex-col gap-4">
        <LearnMaterialDetails details={data} />
        <div className="flex w-full flex-col gap-2">
          <CommentForm entityId={data.id} entityKey="learn-materials" />
        </div>
        <Comments entityId={data.id} entityKey="learn-materials" />
      </div>
    </section>
  );
};

export default LearnMaterialsPreviewPage;
