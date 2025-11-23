import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { ProjectCard, type ProjectCardDTO } from '@/entities/project';
import { EmptyAdminProjectList } from './EmptyAdminProjectList';
import { ProjectDeleteButton } from '@/features/project-delete-button';
import {
  ProjectDeleteModal,
  useDeleteProjectModal,
} from '@/features/project-delete-modal';

type AdminProjectListProps = {
  projects: ProjectCardDTO[];
};

export const AdminProjectList = ({ projects }: AdminProjectListProps) => {
  const { open } = useDeleteProjectModal();

  const navigate = useNavigate();

  if (!projects.length) {
    return <EmptyAdminProjectList />;
  }

  const handleNavigate = (id: string) => {
    navigate(`/projects/${id}`);
  };

  const handleDelete = ({ id, name, ownerName }: ProjectCardDTO) => {
    open({ projectId: id, name, ownerName });
  };

  return (
    <>
      <ul className={clsx('grid gap-2')}>
        {projects.map(project => (
          <li key={project.id}>
            <ProjectCard
              type={'row'}
              onClick={() => handleNavigate(project.id)}
              project={project}
              actionSlot={
                <ProjectDeleteButton
                  handleClick={() => handleDelete(project)}
                />
              }
            />
          </li>
        ))}
      </ul>
      <ProjectDeleteModal />
    </>
  );
};
