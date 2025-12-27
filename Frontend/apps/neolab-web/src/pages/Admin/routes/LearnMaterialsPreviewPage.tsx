import { useSuspenseLearnMaterialDetails } from '@/entities/learn-materials';
import { BackButton } from '@/shared/ui';
import { Comments } from '@/widgets/comments';
import { LearnMaterialDetails } from '@/widgets/learn-materials-details';
import { useParams } from 'react-router-dom';

const LearnMaterialsPreviewPage = () => {
  const { materialId = '' } = useParams();
  const { data } = useSuspenseLearnMaterialDetails(materialId);

  return (
    <section className="mb-20 flex w-full flex-col items-start gap-1 sm:max-w-[712px]">
      <div className="flex w-full flex-row justify-between">
        <BackButton to="/admin/learn-materials" />
      </div>
      <div className="flex w-full flex-col gap-4">
        <LearnMaterialDetails details={data} />
        <Comments entityId={data.id} entityKey="learn-materials" isAdminPage />
      </div>
    </section>
  );
};

export default LearnMaterialsPreviewPage;
