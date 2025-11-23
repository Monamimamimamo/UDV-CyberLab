import { resetPasswordSchema } from '@/entities/user';
import { Button, Input } from '@/shared/ui';
import { Link } from 'react-router-dom';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type ResetPasswordType = z.infer<typeof resetPasswordSchema>;

export const ResetPasswordForm = () => {
  // const { login, isPending, error } = useLogin();

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
    console.log(data);
    onReset();

    // login({ ...data, role: Number(userRole) }).finally(onReset);
  };

  const isEmailError = errors.email !== undefined;
  // TODO  || Boolean(error)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            isInvalid={isEmailError}
            errorMessage={errors.email?.message}
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
        // startContent={isPending ? <Spinner size="sm" color="white" /> : null}
        type="submit"
        fullWidth
        // isDisabled={isPending}
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
