import { newPasswordSchema } from '@/entities/user';
import { Button, PasswordInput } from '@/shared/ui';
import { Link } from 'react-router-dom';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type NewPasswordType = z.infer<typeof newPasswordSchema>;

export const NewPasswordForm = () => {
  // const { login, isPending, error } = useLogin();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<NewPasswordType>({
    resolver: zodResolver(newPasswordSchema),
  });

  const onReset = () => {
    reset();
  };

  const onSubmit: SubmitHandler<NewPasswordType> = (data) => {
    console.log(data);
    onReset();

    // login({ ...data, role: Number(userRole) }).finally(onReset);
  };

  const isPasswordError = errors.password !== undefined;
  const isRetryPasswordError = errors.retryPassword !== undefined;
  // TODO  || Boolean(error)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <PasswordInput
            isInvalid={isPasswordError}
            errorMessage={errors.password?.message}
            {...field}
            label="Password"
            placeholder="Введите новый пароль"
            type="password"
            autoComplete="new-password"
          />
        )}
      />

      <Controller
        name="retryPassword"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <PasswordInput
            isInvalid={isRetryPasswordError}
            errorMessage={errors.retryPassword?.message}
            {...field}
            label="Retry Password"
            placeholder="Повторите пароль"
            type="password"
            autoComplete="retry-new-password"
          />
        )}
      />

      <Button
        color="gradient"
        // startContent={isPending ? <Spinner size="sm" color="white" /> : null}
        type="submit"
        fullWidth
        // isDisabled={isPending}
      >
        Сохранить
      </Button>
      <p className="text-small">
        Вспомнили пароль?{' '}
        <Link
          to="/login"
          className="text-link hover:text-orange custom-outline rounded-sm transition duration-200"
        >
          Войти
        </Link>
      </p>
    </form>
  );
};
