import { z } from 'zod';

export const registerSchema = z.object({
  userName: z.string().nonempty('Пожалуйста, введите логин'),
  email: z
    .string()
    .nonempty('Пожалуйста, введите почту')
    .email('Неверный формат электронной почты'),
  password: z
    .string()
    .nonempty('Пожалуйста, введите пароль')
    .min(6, 'Пароль должен быть не менее 6 символов')
    .refine(val => /[A-Z]/.test(val), {
      message: 'Пароль должен содержать хотя бы одну заглавную букву',
    })
    .refine(val => /[0-9]/.test(val), {
      message: 'Пароль должен содержать хотя бы одну цифру',
    }),
});
