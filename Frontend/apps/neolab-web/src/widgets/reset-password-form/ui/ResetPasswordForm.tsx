import { resetPasswordSchema, useForgotPassword } from '@/entities/user';
import { Button, Input, Spinner } from '@/shared/ui';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type ResetPasswordType = z.infer<typeof resetPasswordSchema>;

export const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { forgotPassword, isPending, error } = useForgotPassword();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onReset = () => {
    reset();
  };

  const onSubmit: SubmitHandler<ResetPasswordType> = (data) => {
    forgotPassword({ email: data.email })
      .then(() => {
        navigate('/reset-password/success');
      })
      .finally(onReset);
  };

  const isEmailError = errors.email !== undefined || Boolean(error);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            isInvalid={isEmailError}
            errorMessage={errors.email?.message || error?.message}
            {...field}
            label="E-mail"
            placeholder="Введите адрес электронной почты"
            type="email"
            autoComplete="email"
          />
        )}
      />

      <Button
        color="gradient"
        startContent={isPending ? <Spinner size="sm" color="white" /> : null}
        type="submit"
        fullWidth
        isDisabled={isPending}
      >
        Отправить
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
