import { newPasswordSchema, useResetPassword } from '@/entities/user';
import { Button, PasswordInput, Spinner } from '@/shared/ui';
import { addToast } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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
      .catch((err: AxiosError<{ message: string }>) => {
        if (err.response?.status === 400 && err.response?.data?.message) {
          const errorMessage = err.response.data.message;
          addToast({
            title: 'Ошибка',
            description: errorMessage,
            color: 'danger',
            timeout: 4000,
          });
        }
      })
      .finally(onReset);
  };

  const isPasswordError = errors.password !== undefined || Boolean(error);
  const isRetryPasswordError = errors.retryPassword !== undefined || Boolean(error);

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
