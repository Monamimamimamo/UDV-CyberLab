import type { QuestionDTO } from '@/shared/api/dto';

export const defaultData: Omit<QuestionDTO, 'id' | 'testId'> = {
  points: 1,
  questionTypeName: 'QuestionVariant',
  text: '',
  description: '',
  sortOrder: 0,

  answers: [],
  correctAnswers: [],
  stringAnswers: [],
  isMultipleChoice: false,

  answer: '',
  inputFile: 'string',

  compliances: {},
  rightCompliances: {},
  variants: {},
  variantsJson: '',
};
