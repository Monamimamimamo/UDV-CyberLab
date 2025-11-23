import { z } from 'zod';

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .nonempty('Пожалуйста, введите почту')
    .email('Неверный формат электронной почты'),
});
