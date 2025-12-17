import { useSuspenseLearnMaterialDetails } from '@/entities/learn-materials';
import { BackButton } from '@/shared/ui';
import { LearnMaterialCommentForm } from '@/widgets/learn-material-comment-form';
import { LearnMaterialComments } from '@/widgets/learn-material-comments';
import { LearnMaterialDetails } from '@/widgets/learn-materials-details';
import { useParams } from 'react-router-dom';

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
          <LearnMaterialCommentForm materialId={data.id} />
        </div>
        <LearnMaterialComments materialId={data.id} />
      </div>
    </section>
  );
};

export default LearnMaterialsPreviewPage;
