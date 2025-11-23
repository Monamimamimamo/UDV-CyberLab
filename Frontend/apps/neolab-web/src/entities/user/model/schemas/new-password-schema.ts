import { z } from 'zod';

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty('Пожалуйста, введите пароль')
      .min(6, 'Пароль должен быть не менее 6 символов')
      .refine((val) => /[A-Z]/.test(val), {
        message: 'Пароль должен содержать хотя бы одну заглавную букву',
      })
      .refine((val) => /[0-9]/.test(val), {
        message: 'Пароль должен содержать хотя бы одну цифру',
      }),
    retryPassword: z.string().nonempty('Пожалуйста, повторите пароль'),
  })
  .refine((data) => data.password === data.retryPassword, {
    message: 'Пароли не совпадают',
    path: ['retryPassword'],
  });
