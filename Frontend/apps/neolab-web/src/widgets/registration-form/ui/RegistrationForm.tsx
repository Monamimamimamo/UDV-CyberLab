import { StatusSwitcher, useRoleSwitcher } from '@/features/status-switcher';
import { registerSchema, useRegister } from '@/entities/user';
import { Button, Input, PasswordInput, Spinner } from '@/shared/ui';
import { Link } from 'react-router-dom';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type RegisterType = z.infer<typeof registerSchema>;

export const RegistrationForm = () => {
  const { userRole } = useRoleSwitcher();
  const { register, isPending, error } = useRegister();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
  });

  const onReset = () => {
    reset();
  };

  const onSubmit: SubmitHandler<RegisterType> = data => {
    register({ ...data, role: Number(userRole) }).then(onReset);
  };

  const isEmailError = errors.email !== undefined || Boolean(error);
  const isLoginError = errors.userName !== undefined || Boolean(error);
  const isPasswordError = errors.password !== undefined || Boolean(error);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <StatusSwitcher />
      <Controller
        name="userName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            isInvalid={isLoginError}
            errorMessage={errors.userName?.message}
            {...field}
            label="Login"
            placeholder="Введите логин"
            type="text"
            autoComplete="username"
          />
        )}
      />
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
            placeholder="Введите почту"
            type="email"
            autoComplete="email"
          />
        )}
      />
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
            placeholder="Введите пароль"
            type="password"
            autoComplete="new-password"
          />
        )}
      />
      <Button
        color="gradient"
        type="submit"
        fullWidth
        isDisabled={isPending}
        startContent={isPending ? <Spinner size="sm" color="white" /> : null}
      >
        Зарегистрироваться
      </Button>
      <p className="text-small">
        Уже есть аккаунт?{' '}
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
