import type { QuestionType } from '@/shared/api/dto';

export type QuestionEditType = QuestionType | 'QuestionVariantMultiply'

export const questionTypes: {
  key: QuestionEditType;
  label: string;
  isMulti?: boolean;
}[] = [
  { key: 'QuestionVariant', label: 'Один вариант' },
  { key: 'QuestionVariantMultiply', label: 'Несколько вариантов' },
  { key: 'QuestionOpen', label: 'Открытый вопрос' },
  { key: 'QuestionCompliance', label: 'Соответствие' },
  { key: 'QuestionFile', label: 'Загрузить файл' },
];
