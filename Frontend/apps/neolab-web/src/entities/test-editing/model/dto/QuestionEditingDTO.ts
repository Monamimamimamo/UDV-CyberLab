import type {
  ComplianceQuestionDTO,
  FileQuestionDTO,
  OpenQuestionDTO,
  VariantQuestionDTO,
} from '@/shared/api/dto';
import type { WithoutId, TestId } from '@/shared/types';

export type CreateFileQuestionDTO = WithoutId<FileQuestionDTO> & TestId;
export type CreateComplianceQuestionDTO = WithoutId<ComplianceQuestionDTO> & TestId;
export type CreateOpenQuestionDTO = WithoutId<OpenQuestionDTO> & TestId;
export type CreateVariantQuestionDTO = WithoutId<VariantQuestionDTO> & TestId;

export interface UpdateQuestionDTO {
  openAnswer?: OpenQuestionDTO & TestId;
  variantAnswer?: VariantQuestionDTO & TestId;
  complianceAnswer?: ComplianceQuestionDTO & TestId;
  fileAnswer?: FileQuestionDTO & TestId;
}
