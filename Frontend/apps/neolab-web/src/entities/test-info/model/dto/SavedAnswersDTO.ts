import type {
  ComplianceQuestionDTO,
  FileQuestionDTO,
  OpenQuestionDTO,
  VariantQuestionDTO,
} from '@/shared/api/dto';

export interface SavedAnswersDTO {
  userTestId: string;
  openAnswers: OpenQuestionDTO[];
  fileAnswers: FileQuestionDTO[];
  variantAnswers: VariantQuestionDTO[];
  complianceAnswers: ComplianceQuestionDTO[];
}
