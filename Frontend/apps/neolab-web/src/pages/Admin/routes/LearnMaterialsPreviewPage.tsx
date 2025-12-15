import { useSuspenseLearnMaterialDetails } from '@/entities/learn-materials';
import { BackButton } from '@/shared/ui';
import { LearnMaterialComments } from '@/widgets/learn-material-comments';
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
      <div className="w-full flex flex-col gap-4">
        <LearnMaterialDetails details={data} />
        <LearnMaterialComments materialId={data.id} isAdminPage={true} />
      </div>
    </section>
  );
};

export default LearnMaterialsPreviewPage;
