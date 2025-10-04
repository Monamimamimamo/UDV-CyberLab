import { ProjectList } from '@/widgets/project-list';
import { useMyProjectList } from '@/entities/project/api/queries/useMyProjectList';
// import { useQueryState } from 'nuqs';

const MyProjectsPage = () => {
  const { data } = useMyProjectList();
  // const [sort] = useQueryState('sort', { defaultValue: '' });

  return (
    <section className="mt-4 mb-20">
      <ProjectList projects={data} />
    </section>
  );
};

export default MyProjectsPage;
