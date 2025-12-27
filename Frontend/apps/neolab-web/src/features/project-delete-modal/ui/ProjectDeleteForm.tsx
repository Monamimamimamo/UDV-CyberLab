import { zodResolver } from '@hookform/resolvers/zod';
import { ModalBody, Divider } from '@heroui/react';
import { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { useDeleteProjectModal } from '../model/store';
import { Button, Input } from '@/shared/ui';
import { useAdminDeleteProject } from '@/entities/admin';

const createDeleteProjectSchema = (ownerName: string) =>
  z.object({
    username: z
      .string()
      .trim()
      .min(1, 'Укажите имя создателя проекта')
      .refine(value => value === ownerName, {
        message: 'Имя создателя проекта не совпадает',
      }),
  });

type DeleteProjectInput = z.infer<ReturnType<typeof createDeleteProjectSchema>>;

export const ProjectDeleteForm = () => {
  const { deleteProject, isPending } = useAdminDeleteProject();
  const { options, setOpen } = useDeleteProjectModal();

  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<DeleteProjectInput>({
    resolver: zodResolver(createDeleteProjectSchema(options?.ownerName || '')),
  });

  const onReset = useCallback(() => {
    reset({
      username: '',
    });
  }, [reset]);

  const onSubmit = () => {
    if (options?.projectId) {
      deleteProject(options?.projectId)
        .then(handleReturn)
        .catch(error => setError('username', error));
    }
  };

  const handleReturn = () => {
    setOpen(false);
    onReset();
  };

  return (
    <ModalBody className="py-5 px-10">
      <p className="text-[20px] mb-2 mx-5 text-center">
        Вы действительно хотите удалить проект?
      </p>
      <div className="flex flex-col gap-2 text-[14px]">
        <div>
          <p className="font-bold">Название проекта:</p>
          <p>{options?.name}</p>
        </div>
        <div>
          <p className="font-bold">Создатель проекта:</p>
          <p>{options?.ownerName}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              isRequired
              {...field}
              label="Имя создателя проекта"
              autoComplete="new-password"
              variant="underlined"
              isInvalid={!!errors.username}
              errorMessage={errors.username?.message}
              classNames={{
                label: 'group-data-[filled-within=true]:text-foreground',
              }}
            />
          )}
        />

        <div className="mt-4 flex flex-row gap-4 items-center justify-center">
          <Button
            type="submit"
            color="danger"
            size="md"
            radius="sm"
            className="w-1/2 text-white bg-red-500"
            isLoading={isPending}
          >
            Удалить
          </Button>
          <Divider orientation="vertical" className="h-12 bg-foreground/30" />

          <Button
            type="button"
            className="w-1/2"
            size="md"
            radius="sm"
            color="default"
            variant="bordered"
            onPress={handleReturn}
          >
            Отмена
          </Button>
        </div>
      </form>
    </ModalBody>
  );
};
