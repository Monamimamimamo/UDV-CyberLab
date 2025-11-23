import { memo, type SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { Card } from '@/shared/ui';
import { ActionsSwitcher } from './actions/ActionsSwitcher';
import type { QuestionDTO } from '@/shared/api/dto';
import { QuestionTypeEdit } from './QuestionTypeEdit';
import { QuestionUtilsEdit } from './QuestionUtilsEdit';
import { TextQuestionEdit } from './TextQuestionEdit';
import { defaultData } from '../const/defaultData';
import {
  useEditComplianceQuestion,
  useEditFileQuestion,
  useEditTextQuestion,
  useEditVariantQuestion,
} from '../api/mutations';
import {
  validateCompliance,
  validateFile,
  validateOpen,
  validateVariants,
} from '../utils/validateCreateData';
import { parseCompliance, parseFile, parseOpen, parseVariants } from '../utils/parseCreateData';
import type { QuestionEditType } from '../const/questionTypes';

type QuestionCreateCardProps = {
  index: number;
  question: QuestionDTO;
  setQuestion: React.Dispatch<SetStateAction<QuestionDTO[]>>;
};

export const QuestionCreateCard = memo(
  ({ index, question, setQuestion }: QuestionCreateCardProps) => {
    const ref = useRef<QuestionDTO | null>(null);

    const complianceQuestion = useEditComplianceQuestion(question.testId);
    const fileQuestion = useEditFileQuestion(question.testId);
    const textQuestion = useEditTextQuestion(question.testId);
    const variantQuestion = useEditVariantQuestion(question.testId);

    const [currentSettings, setCurrentSettings] = useState<QuestionDTO>(() => ({
      ...question,
      ...defaultData,
    }));

    const handleDeleteQuestion = useCallback(() => {
      setQuestion((prev) => prev.filter((q) => q.id !== question.id));
    }, [question.id, setQuestion]);

    const handleChangePoints = useCallback(
      (e: string) => {
        ref.current = { ...currentSettings, points: Number(e) };
        setCurrentSettings((prev) => ({ ...prev, points: Number(e) }));
      },
      [currentSettings],
    );

    const handleChangeAnswers = useCallback(
      (value: Partial<QuestionDTO>) => {
        ref.current = { ...currentSettings, ...value };
        setCurrentSettings((prev) => ({ ...prev, ...value }));
      },
      [currentSettings],
    );

    const handleChangeQuestion = useCallback(
      (value: string) => {
        ref.current = { ...currentSettings, text: value };
        setCurrentSettings((prev) => ({ ...prev, text: value }));
      },
      [currentSettings],
    );

    const handleChangeType = useCallback(
      (value: QuestionEditType) => {
        if (value === 'QuestionVariant' || value === 'QuestionVariantMultiply') {
          const isMultipleChoice = value === 'QuestionVariantMultiply';
          setCurrentSettings((prev) => {
            const newData: QuestionDTO = {
              ...defaultData,
              id: prev.id,
              testId: prev.testId,
              points: prev.points,
              text: prev.text,
              stringAnswers: prev.stringAnswers,
              questionTypeName: 'QuestionVariant',
              isMultipleChoice,
            };

            ref.current = { ...newData };
            return newData;
          });
        } else {
          setCurrentSettings((prev) => {
            const newData: QuestionDTO = {
              ...defaultData,
              id: prev.id,
              testId: prev.testId,
              points: prev.points,
              text: prev.text,
              questionTypeName: value,
            };

            ref.current = { ...newData };
            return newData;
          });
        }
      },
      [setCurrentSettings],
    );

    useEffect(() => {
      return () => {
        if (!ref.current) return;

        if (ref.current.questionTypeName === 'QuestionCompliance') {
          if (validateCompliance(ref.current)) {
            complianceQuestion.mutate(parseCompliance(ref.current));
          }
        } else if (ref.current.questionTypeName === 'QuestionFile') {
          if (validateFile(ref.current)) {
            fileQuestion.mutate(parseFile(ref.current));
          }
        } else if (ref.current.questionTypeName === 'QuestionOpen') {
          if (validateOpen(ref.current)) {
            textQuestion.mutate(parseOpen(ref.current));
          }
        } else if (ref.current.questionTypeName === 'QuestionVariant') {
          if (validateVariants(ref.current)) {
            variantQuestion.mutate(parseVariants(ref.current));
          }
        }
      };
    }, []);

    return (
      <Card className="px-[20px] pt-[13px] pb-[20px] sm:px-[40px]">
        <div>
          <h4 className="mb-3 text-[16px]">Вопрос {index}</h4>
          <QuestionTypeEdit
            handleChangeType={handleChangeType}
            questionType={currentSettings.questionTypeName}
            isMultipleChoice={currentSettings.isMultipleChoice}
          />
          <TextQuestionEdit
            question={currentSettings.text}
            handleChangeQuestion={handleChangeQuestion}
          />
          {currentSettings.questionTypeName && (
            <ActionsSwitcher question={currentSettings} changeQuestion={handleChangeAnswers} />
          )}
          <QuestionUtilsEdit
            points={currentSettings.points}
            handleDeleteQuestion={handleDeleteQuestion}
            handleChangePoints={handleChangePoints}
          />
        </div>
      </Card>
    );
  },
);
