import {
  useUpdateProject,
  useProjectDetails,
  useProjectFiles,
  type UpdateProjectDTO,
} from '@/entities/project';
import { useAuth } from '@/entities/user';
import { parseAndCreateFile } from '@/shared/common/utils/file';
import { ModalSpinner } from '@/shared/ui';
import { ModalBody } from '@heroui/react';
import { ProjectEditForm } from './ProjectEditForm/ProjectEditForm';
import type { ProjectFormInputs } from './ProjectEditForm/schema';

export const ModalProjectEdit = ({ projectId }: { projectId: string }) => {
  const user = useAuth((state) => state.user);

  const { mutateAsync: updateProject, isPending: isUpdatePending } = useUpdateProject();
  const { data, isLoading, isFetching } = useProjectDetails(projectId);
  const {
    data: filesData,
    isLoading: isFilesLoading,
    isFetching: isFilesFetching,
  } = useProjectFiles(projectId);

  if (!filesData || !data || isLoading || isFilesLoading || isFilesFetching || isFetching) {
    return <ModalSpinner />;
  }

  const logoPhoto = parseAndCreateFile(filesData?.logo);
  const documentation = parseAndCreateFile(filesData?.documentation, data.name);

  const onEditSubmit = async (formData: ProjectFormInputs) => {
    const payload: Partial<UpdateProjectDTO> = {};
    let countDirtyFields = 0;

    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof ProjectFormInputs;

      // TODO: Убрать, кода появятся картинки проекта
      if (fieldName === 'projectPhoto') return;

      if (fieldName === 'logoPhoto') {
        if (formData.logoPhoto?.name !== logoPhoto.name) {
          payload.logoPhoto = formData.logoPhoto;
          countDirtyFields++;
        }
      } else if (fieldName === 'documentation') {
        if (formData.documentation?.name !== documentation.name) {
          payload.documentation = formData.documentation;
          countDirtyFields++;
        }
      } else if (formData[fieldName] !== data[fieldName]) {
        payload[fieldName] = formData[fieldName];
        countDirtyFields++;
      }
    });

    if (user?.userName && data?.id && countDirtyFields) {
      updateProject({ ...payload, ownerName: user.userName, id: data?.id });
    }
  };

  return (
    <ModalBody>
      <section className="flex w-full flex-col gap-[15px] sm:gap-[80px]">
        <ProjectEditForm
          label="Редактирование проекта"
          onSubmit={onEditSubmit}
          defaultData={{
            ...data,
            logoPhoto,
            documentation,
          }}
          isPending={isUpdatePending}
        />
      </section>
    </ModalBody>
  );
};
