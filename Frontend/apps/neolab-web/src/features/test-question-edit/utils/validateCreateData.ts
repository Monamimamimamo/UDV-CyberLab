import type {
  BaseQuestionDTO,
  ComplianceQuestionDTO,
  FileQuestionDTO,
  OpenQuestionDTO,
  VariantQuestionDTO,
} from '@/shared/api/dto';

const validateBase = (data: BaseQuestionDTO) => Boolean(data.text) && data.points > 0 && data.text;

export const validateCompliance = (data: ComplianceQuestionDTO) => {
  const complianceLen = Object.keys(data.compliances).length;
  const rightCompliancesLen = Object.keys(data.compliances).length;
  const variants = Object.keys(data.compliances).length;

  const isCorrect = complianceLen === rightCompliancesLen && rightCompliancesLen === variants;

  return validateBase(data) && data.compliances && isCorrect && complianceLen > 0;
};

export const validateFile = (data: FileQuestionDTO) =>
  Boolean(data.inputFile) && validateBase(data);

export const validateOpen = (data: OpenQuestionDTO) => Boolean(data.answer) && validateBase(data);

export const validateVariants = (data: VariantQuestionDTO) =>
  data.correctAnswers.length > 0 && data.stringAnswers.length > 0 && validateBase(data);
