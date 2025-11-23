import type { QuestionType } from '@/shared/api/dto';
import type {
  SavedAnswer,
  SavedAnswersDTO,
  SavedComplianceAnswerDTO,
  SavedFileAnswerDTO,
  SavedOpenAnswerDTO,
  SavedVariantAnswerDTO,
} from '../model/dto';

export const parseData = (
  userTestId: string,
  answer: SavedAnswer,
  type: QuestionType,
): SavedAnswersDTO => {
  return {
    userTestId,
    complianceAnswers: type === 'QuestionCompliance' ? [answer as SavedComplianceAnswerDTO] : [],
    fileAnswers: type === 'QuestionFile' ? [answer as SavedFileAnswerDTO] : [],
    openAnswers: type === 'QuestionOpen' ? [answer as SavedOpenAnswerDTO] : [],
    variantAnswers: type === 'QuestionVariant' ? [answer as SavedVariantAnswerDTO] : [],
  };
};
