import { newPasswordSchema, useResetPassword } from '@/entities/user';
import { Button, PasswordInput, Spinner } from '@/shared/ui';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type NewPasswordType = z.infer<typeof newPasswordSchema>;

export const NewPasswordForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { resetPassword, isPending, error } = useResetPassword();

  const email = searchParams.get('email');
  const token = searchParams.get('token');

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
    if (!email || !token) {
      return;
    }

    resetPassword({
      email,
      token,
      newPassword: data.password,
    })
      .then(() => {
        navigate('/new-password/success');
      })
      .finally(onReset);
  };

  const isPasswordError = errors.password !== undefined || Boolean(error);
  const isRetryPasswordError = errors.retryPassword !== undefined;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <PasswordInput
            isInvalid={isPasswordError}
            errorMessage={errors.password?.message || error?.message}
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
        startContent={isPending ? <Spinner size="sm" color="white" /> : null}
        type="submit"
        fullWidth
        isDisabled={isPending || !email || !token}
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
