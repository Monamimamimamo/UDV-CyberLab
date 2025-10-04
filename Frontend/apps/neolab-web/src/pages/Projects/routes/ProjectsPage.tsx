import { useProjectList } from '@/entities/project';
import { ProjectSorting } from '@/entities/sorting';
import { ProjectList } from '@/widgets/project-list';
import { useQueryState } from 'nuqs';

const ProjectsPage = () => {
  const [sort] = useQueryState('sort', { defaultValue: '' });
  const { data } = useProjectList({
    sortOrder: ProjectSorting[sort as keyof typeof ProjectSorting],
  });

  return (
    <section className="mt-4 mb-20">
      <ProjectList projects={data} />
    </section>
  );
};

export default ProjectsPage;
