import { useCreateProject } from '@/entities/project';
import { useAuth } from '@/entities/user';
import { ModalBody } from '@heroui/react';
import { ProjectEditForm } from './ProjectEditForm/ProjectEditForm';
import type { ProjectFormInputs } from './ProjectEditForm/schema';

export const ModalProjectCreate = () => {
  const user = useAuth(state => state.user);
  const { mutateAsync: createProject, isPending: isCreatePending } =
    useCreateProject();

  const onCreateSubmit = async (formData: ProjectFormInputs) => {
    if (user?.userName) {
      createProject({ ...formData, ownerName: user.userName });
    }
  };

  return (
    <ModalBody>
      <section className="w-full flex flex-col sm:gap-[80px] gap-[15px]">
        <ProjectEditForm
          label="Добавление проекта"
          onSubmit={onCreateSubmit}
          isPending={isCreatePending}
        />
      </section>
    </ModalBody>
  );
};
