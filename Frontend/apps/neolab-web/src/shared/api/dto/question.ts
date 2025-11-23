export type QuestionType =
  | 'QuestionOpen'
  | 'QuestionFile'
  | 'QuestionCompliance'
  | 'QuestionVariant';

export type BaseQuestionDTO = {
  testId: string;
  id: string;
  sortOrder: number;
  points: number;
  description: string;
  text: string;
  questionTypeName: QuestionType;
};

export interface FileQuestionDTO extends BaseQuestionDTO {
  inputFile: string;
}

export interface OpenQuestionDTO extends BaseQuestionDTO {
  answer: string;
}

export interface VariantQuestionDTO extends BaseQuestionDTO {
  answers: number[];
  correctAnswers: number[];
  stringAnswers: string[];
  isMultipleChoice: boolean;
}

export interface ComplianceQuestionDTO extends BaseQuestionDTO {
  variantsJson: string;
  compliances: { [key: string]: string };
  rightCompliances: { [key: string]: string };
  variants: { [key: string]: string[] };
}

export type QuestionDTO = FileQuestionDTO &
  OpenQuestionDTO &
  VariantQuestionDTO &
  ComplianceQuestionDTO;
