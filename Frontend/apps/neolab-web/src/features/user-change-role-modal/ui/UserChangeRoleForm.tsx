import { ModalBody, Divider } from '@heroui/react';
import { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useChangeUserRoleModal } from '../model/store';
import { Button, Radio, RadioGroup } from '@/shared/ui';
import { useAdminChangeUserRole } from '@/entities/admin';
import { UserCard } from '@/entities/user';
import { UserRole } from '@/shared/types';
import { getRoleName } from '@/entities/user/utils/get-role-name';

const changeUserRoleSchema = z.object({
  role: z.nativeEnum(UserRole),
});

type ChangeUserRoleInput = z.infer<typeof changeUserRoleSchema>;

const roleOptions = [
  { value: UserRole.STUDENT, label: getRoleName(UserRole.STUDENT) },
  { value: UserRole.TEACHER, label: getRoleName(UserRole.TEACHER) },
  { value: UserRole.ADMIN, label: getRoleName(UserRole.ADMIN) },
];

export const UserChangeRoleForm = () => {
  const { changeUserRole, isPending } = useAdminChangeUserRole();
  const { options, setOpen } = useChangeUserRoleModal();

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<ChangeUserRoleInput>({
    resolver: zodResolver(changeUserRoleSchema),
    defaultValues: {
      role: options?.role,
    },
  });

  const selectedRole = watch('role');

  const onReset = useCallback(() => {
    reset({
      role: options?.role,
    });
  }, [reset, options?.role]);

  const onSubmit = (data: ChangeUserRoleInput) => {
    if (options?.userId) {
      const roleMap: Record<UserRole, string> = {
        [UserRole.STUDENT]: 'USER',
        [UserRole.TEACHER]: 'TEACHER',
        [UserRole.ADMIN]: 'ADMIN',
      };

      const roleKey = roleMap[data.role] || 'USER';

      changeUserRole({
        userId: options.userId,
        role: roleKey,
      })
        .then(handleReturn)
        .catch(() => {
          // Ошибка обрабатывается в хуке через toast
        });
    }
  };

  const handleReturn = () => {
    setOpen(false);
    onReset();
  };

  return (
    <ModalBody className="px-10 py-5">
      <p className="mx-5 mb-2 text-center text-[20px]">Смена роли пользователя</p>
      {options && <UserCard user={options} orientation="vertical" />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <RadioGroup
              label="Выберите роль"
              value={field.value?.toString()}
              onValueChange={(value) => field.onChange(Number(value))}
              errorMessage={errors.role?.message}
              isInvalid={!!errors.role}
              classNames={{
                label: 'text-foreground font-semibold',
              }}
            >
              {roleOptions.map((option) => (
                <Radio
                  key={option.value}
                  value={option.value.toString()}
                  classNames={{
                    label: 'text-foreground ml-1',
                  }}
                >
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
          )}
        />

        <div className="mt-4 flex flex-row items-center justify-center gap-4">
          <Button
            type="submit"
            color="gradient"
            size="md"
            radius="sm"
            className="w-1/2"
            isLoading={isPending}
            isDisabled={selectedRole === options?.role}
          >
            Сохранить
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
