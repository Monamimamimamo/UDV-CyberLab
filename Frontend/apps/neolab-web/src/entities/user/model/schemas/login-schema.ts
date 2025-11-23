import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty('Пожалуйста, введите почту')
    .email('Неверный формат электронной почты'),
  password: z.string().nonempty('Пожалуйста, введите пароль'),
});
