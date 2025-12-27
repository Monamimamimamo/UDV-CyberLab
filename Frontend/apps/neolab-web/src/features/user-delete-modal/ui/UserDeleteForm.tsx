import { zodResolver } from '@hookform/resolvers/zod';
import { ModalBody, Divider } from '@heroui/react';
import { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { useDeleteUserModal } from '../model/store';
import { Button, Input } from '@/shared/ui';
import { useAdminDeleteUser } from '@/entities/admin';
import { UserCard } from '@/entities/user';

const createDeleteUserSchema = (ownerName: string) =>
  z.object({
    username: z
      .string()
      .trim()
      .min(1, 'Подтвердите почту пользователя')
      .refine((value) => value === ownerName, {
        message: 'Почта пользователя не совпадает',
      }),
  });

type DeleteUserInput = z.infer<ReturnType<typeof createDeleteUserSchema>>;

export const UserDeleteForm = () => {
  const { deleteUser, isPending } = useAdminDeleteUser();
  const { options, setOpen } = useDeleteUserModal();

  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<DeleteUserInput>({
    resolver: zodResolver(createDeleteUserSchema(options?.email || '')),
  });

  const onReset = useCallback(() => {
    reset({
      username: '',
    });
  }, [reset]);

  const onSubmit = () => {
    if (options?.userId) {
      deleteUser(options?.userId)
        .then(handleReturn)
        .catch((error) => setError('username', error));
    }
  };

  const handleReturn = () => {
    setOpen(false);
    onReset();
  };

  return (
    <ModalBody className="px-10 py-5">
      <p className="mx-5 mb-2 text-center text-[20px]">
        Вы действительно хотите удалить пользователя?
      </p>
      {options && <UserCard user={options} orientation="vertical" />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              isRequired
              {...field}
              label="Email пользователя"
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

        <div className="mt-4 flex flex-row items-center justify-center gap-4">
          <Button
            type="submit"
            color="danger"
            size="md"
            radius="sm"
            className="w-1/2 bg-red-500 text-white"
            isLoading={isPending}
          >
            Удалить
          </Button>
          <Divider orientation="vertical" className="bg-foreground/30 h-12" />

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
