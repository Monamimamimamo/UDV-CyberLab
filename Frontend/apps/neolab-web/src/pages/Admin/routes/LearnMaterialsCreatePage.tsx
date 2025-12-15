import { useCreateLearnMaterials } from '@/entities/learn-materials';
import { useAuth } from '@/entities/user';
import { BackButton } from '@/shared/ui';
import { AdminLearnMaterialsForm, type LearnMaterialFormInputs } from '@/widgets/admin-learn-materials-form';
import { useNavigate } from 'react-router-dom';

const LearnMaterialsCreatePage = () => {
  const user = useAuth((state) => state.user);
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateLearnMaterials();

  const onCreateSubmit = async (formData: LearnMaterialFormInputs) => {
    if (user?.userName) {
      mutateAsync({ ...formData, ownerName: user.userName }).then((id) =>
        navigate(`/admin/learn-materials/${id}/edit`),
      );
    }
  };

  return (
    <section className="mb-20 flex w-full flex-col items-start gap-1 sm:max-w-[712px]">
      <div className="mb-2 flex w-full flex-row justify-between">
        <BackButton to="/admin/learn-materials" />
      </div>
      <div className="w-full">
        <AdminLearnMaterialsForm onSubmit={onCreateSubmit} isPending={isPending} />
      </div>
    </section>
  );
};

export default LearnMaterialsCreatePage;
