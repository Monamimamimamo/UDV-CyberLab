import z from 'zod';

export const commentSchema = z.object({
  text: z.string().trim().min(1, 'Комментарий не может быть пустым'),
});

export type CommentInputs = z.infer<typeof commentSchema>;
