export interface SavedAnswersDTO {
  userTestId: string;
  openAnswers: SavedOpenAnswerDTO[];
  variantAnswers: SavedVariantAnswerDTO[];
  complianceAnswers: SavedComplianceAnswerDTO[];
  fileAnswers: SavedFileAnswerDTO[];
}

interface BaseSavedAnswerDTO {
  questionId: string;
  userAnswerId?: string;
}

export interface SavedOpenAnswerDTO extends BaseSavedAnswerDTO {
  answerText: string;
}

export interface SavedVariantAnswerDTO extends BaseSavedAnswerDTO {
  selectedAnswers: number[];
}

export interface SavedComplianceAnswerDTO extends BaseSavedAnswerDTO {
  userCompliances: { [key: string]: string };
}

export interface SavedFileAnswerDTO extends BaseSavedAnswerDTO {
  userFileContent: string;
}

export type SavedAnswer =
  | SavedOpenAnswerDTO
  | SavedVariantAnswerDTO
  | SavedComplianceAnswerDTO
  | SavedFileAnswerDTO;
  

export type SavedAnswerWithKey = { id: string; data: SavedAnswer | null };
