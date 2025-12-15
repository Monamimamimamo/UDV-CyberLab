import { useNewsSuspenseFileSrc, useSuspenseNewsDetails, useUpdateNews } from '@/entities/news';
import { useAuth } from '@/entities/user';
import { parseAndCreateFile } from '@/shared/common/utils/file';
import { BackButton } from '@/shared/ui';
import { AdminNewsForm, type NewsFormInputs } from '@/widgets/admin-news-form';
import { useNavigate, useParams } from 'react-router-dom';

const NewsEditPage = () => {
  const { newsId = '' } = useParams();

  const navigate = useNavigate();
  const user = useAuth((state) => state.user);
  const { mutateAsync, isPending } = useUpdateNews();
  const { data } = useSuspenseNewsDetails(newsId);
  const { data: imgSrc } = useNewsSuspenseFileSrc(data.logoPath, data.id);

  const onEditSubmit = async (formData: NewsFormInputs) => {
    if (user?.userName && data?.id) {
      mutateAsync({ ...formData, ownerName: user.userName, id: data?.id });
      navigate('/admin/news');
    }
  };

  // TODO Баг почему-то не перезапрашивается дата после рефеча
  // TODO Баг при редактировании
  const logoPhoto = parseAndCreateFile(imgSrc);

  return (
    <section className="mb-20 flex w-full flex-col items-start gap-1 sm:max-w-[712px]">
      <div className="mb-2 flex w-full flex-row justify-between">
        <BackButton to="/admin/news" />
      </div>
      <div className="w-full">
        <AdminNewsForm
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

export default NewsEditPage;
