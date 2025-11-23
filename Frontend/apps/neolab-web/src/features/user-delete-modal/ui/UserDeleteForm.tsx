import { zodResolver } from '@hookform/resolvers/zod';
import { ModalBody, Divider } from '@heroui/react';
import { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { useDeleteUserModal } from '../model/store';
import { Button, Input } from '@/shared/ui';
import { useDeleteUser } from '@/entities/admin';
import { UserCard } from '@/entities/user';

const createDeleteUserSchema = (ownerName: string) =>
  z.object({
    username: z
      .string()
      .trim()
      .min(1, 'Подтвердите почту пользователя')
      .refine(value => value === ownerName, {
        message: 'Почта пользователя не совпадает',
      }),
  });

type DeleteUserInput = z.infer<ReturnType<typeof createDeleteUserSchema>>;

export const UserDeleteForm = () => {
  const { mutateAsync, isPending } = useDeleteUser();
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
      mutateAsync(options?.userId)
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
