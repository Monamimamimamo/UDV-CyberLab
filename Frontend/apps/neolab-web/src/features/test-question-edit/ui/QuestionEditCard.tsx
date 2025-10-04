import { memo, type SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { Card } from '@/shared/ui';
import { ActionsSwitcher } from './actions/ActionsSwitcher';
import type { QuestionDTO } from '@/shared/api/dto';
import { useDeleteQuestion } from '../api/mutations/useDeleteQuestion';
import { QuestionUtilsEdit } from './QuestionUtilsEdit';
import { TextQuestionEdit } from './TextQuestionEdit';
import { useUpdateQuestion } from '../api/mutations';

type QuestionEditCardProps = {
  index: number;
  question: QuestionDTO;
  setQuestion: React.Dispatch<SetStateAction<QuestionDTO[]>>;
};

export const QuestionEditCard = memo(({ index, question, setQuestion }: QuestionEditCardProps) => {
  const ref = useRef<QuestionDTO | null>(null);
  const [currentSettings, setCurrentSettings] = useState<QuestionDTO>(question);

  const updateQuestion = useUpdateQuestion(question.testId);
  const deleteQuestion = useDeleteQuestion(question.testId);

  const handleDeleteQuestion = useCallback(() => {
    deleteQuestion.mutate(question.id);
    setQuestion((prev) => prev.filter((q) => q.id !== question.id));
  }, [deleteQuestion, question.id, setQuestion]);

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

  useEffect(() => {
    return () => {
      if (!ref.current) return;

      if (ref.current.questionTypeName === 'QuestionCompliance') {
        updateQuestion.mutate({ complianceAnswer: ref.current });
      } else if (ref.current.questionTypeName === 'QuestionVariant') {
        updateQuestion.mutate({ variantAnswer: ref.current });
      } else if (ref.current.questionTypeName === 'QuestionOpen') {
        updateQuestion.mutate({ openAnswer: ref.current });
      } else if (ref.current.questionTypeName === 'QuestionFile') {
        updateQuestion.mutate({ fileAnswer: ref.current });
      }
    };
  }, []);

  return (
    <Card className="px-[20px] pt-[13px] pb-[20px] sm:px-[40px]">
      <div>
        <h4 className="mb-3 text-[16px]">Вопрос {index}</h4>
        <TextQuestionEdit
          question={currentSettings.text}
          handleChangeQuestion={handleChangeQuestion}
        />
        <ActionsSwitcher question={currentSettings} changeQuestion={handleChangeAnswers} />
        <QuestionUtilsEdit
          points={currentSettings.points}
          handleDeleteQuestion={handleDeleteQuestion}
          handleChangePoints={handleChangePoints}
        />
      </div>
    </Card>
  );
});
