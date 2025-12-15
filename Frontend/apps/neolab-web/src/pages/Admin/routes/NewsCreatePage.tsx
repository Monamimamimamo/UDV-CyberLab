import { useCreateNews } from '@/entities/news';
import { useAuth } from '@/entities/user';
import { BackButton } from '@/shared/ui';
import { AdminNewsForm, type NewsFormInputs } from '@/widgets/admin-news-form';
import { useNavigate } from 'react-router-dom';

const NewsCreatePage = () => {
  const user = useAuth((state) => state.user);
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateNews();

  const onCreateSubmit = async (formData: NewsFormInputs) => {
    if (user?.userName) {
      return mutateAsync({ ...formData, ownerName: user.userName }).then((id) =>
        navigate(`/admin/news/${id}/edit`),
      );
    }
  };

  return (
    <section className="mb-20 flex w-full flex-col items-start gap-1 sm:max-w-[712px]">
      <div className="mb-2 flex w-full flex-row justify-between">
        <BackButton to="/admin/news" />
      </div>
      <div className="w-full">
        <AdminNewsForm onSubmit={onCreateSubmit} isPending={isPending} />
      </div>
    </section>
  );
};

export default NewsCreatePage;
