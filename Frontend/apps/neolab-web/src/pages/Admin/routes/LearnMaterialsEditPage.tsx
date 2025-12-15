import { useLearnMaterialSuspenseFileSrc, useSuspenseLearnMaterialDetails, useUpdateLearnMaterials } from '@/entities/learn-materials';
import { useAuth } from '@/entities/user';
import { parseAndCreateFile } from '@/shared/common/utils/file';
import { BackButton } from '@/shared/ui';
import { AdminLearnMaterialsForm, type LearnMaterialFormInputs } from '@/widgets/admin-learn-materials-form';
import { useNavigate, useParams } from 'react-router-dom';

const LearnMaterialsEditPage = () => {
  const { materialId = '' } = useParams();

  const navigate = useNavigate();
  const user = useAuth((state) => state.user);
  const { mutateAsync, isPending } = useUpdateLearnMaterials();
  const { data } = useSuspenseLearnMaterialDetails(materialId);
  const { data: imgSrc } = useLearnMaterialSuspenseFileSrc(data.logoPath, data.id);

  const onEditSubmit = async (formData: LearnMaterialFormInputs) => {
    if (user?.userName && data?.id) {
      mutateAsync({ ...formData, ownerName: user.userName, id: data?.id });
      navigate('/admin/learn-materials');
    }
  };

  const logoPhoto = parseAndCreateFile(imgSrc);

  return (
    <section className="mb-20 flex w-full flex-col items-start gap-1 sm:max-w-[712px]">
      <div className="mb-2 flex w-full flex-row justify-between">
        <BackButton to="/admin/learn-materials" />
      </div>
      <div className="w-full">
        <AdminLearnMaterialsForm
          onSubmit={onEditSubmit}
          isPending={isPending}
          defaultData={{
            ...data,
            logoPhoto,
          }}
        />
      </div>
    </section>
  );
};

export default LearnMaterialsEditPage;
