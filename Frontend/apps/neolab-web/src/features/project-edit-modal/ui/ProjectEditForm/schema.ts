import { z } from 'zod';

export const projectSchema = z.object({
  name: z
    .string()
    .min(1, 'Пожалуйста, введите название проекта')
    .max(50, 'Название проекта не должно превышать 50 символов'),
  shortDescription: z
    .string()
    .min(1, 'Пожалуйста, введите краткое описание проекта')
    .max(150, 'Краткое описание проекта не должно превышать 150 символов'),
  description: z
    .string()
    .min(1, 'Пожалуйста, введите подробное описание проекта')
    .max(1000, 'Подробное описание проекта не должно превышать 1000 символов'),
  ownerName: z.string().nonempty().optional(),
  landingURL: z.string().url('Пожалуйста, введите корректный URL'),
  logoPhoto: z.instanceof(File, {
    message: 'Пожалуйста, загрузите логотип проекта',
  }),
  projectPhoto: z.instanceof(File).optional(),
  documentation: z.instanceof(File, {
    message: 'Пожалуйста, загрузите документацию проекта',
  }),
});

export type ProjectFormInputs = z.infer<typeof projectSchema>;