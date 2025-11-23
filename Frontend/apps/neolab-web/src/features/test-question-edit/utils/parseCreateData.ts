import type {
  ComplianceQuestionDTO,
  FileQuestionDTO,
  OpenQuestionDTO,
  QuestionDTO,
  VariantQuestionDTO,
} from '@/shared/api/dto';

const parseDefault = (data: QuestionDTO) => ({
  testId: data.testId,
  sortOrder: data.sortOrder,
  points: data.points,
  text: data.text,
  description: data.description,
  questionTypeName: data.questionTypeName,
});

export const parseCompliance = (
  data: QuestionDTO
): Omit<ComplianceQuestionDTO, 'id'> => {
  return {
    ...parseDefault(data),
    variantsJson: data.variantsJson,
    compliances: data.compliances,
    rightCompliances: data.rightCompliances,
    variants: data.variants,
  };
};

export const parseFile = (data: QuestionDTO): Omit<FileQuestionDTO, 'id'> => {
  return {
    ...parseDefault(data),
    inputFile: data.inputFile,
  };
};

export const parseOpen = (data: QuestionDTO): Omit<OpenQuestionDTO, 'id'> => {
  return {
    ...parseDefault(data),
    answer: data.answer,
  };
};

export const parseVariants = (
  data: QuestionDTO
): Omit<VariantQuestionDTO, 'id'> => {
  return {
    ...parseDefault(data),
    answers: data.answers,
    correctAnswers: data.correctAnswers,
    stringAnswers: data.stringAnswers,
    isMultipleChoice: data.isMultipleChoice,
  };
};
