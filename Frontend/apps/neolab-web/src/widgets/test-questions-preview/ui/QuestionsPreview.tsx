import { parseAsInteger, useQueryState } from 'nuqs';
import { useEffect } from 'react';
import { QuestionPreviewCard } from '@/entities/test-question';
import { QuestionsPreviewPaginator } from './QuestionPreviewPaginator';
import { QuestionsPreviewSwitcher } from './QuestionPreviewSwitcher';
import type { QuestionDTO } from '@/shared/api/dto';
import type { TestPreviewDTO } from '@/entities/test-info';

type QuestionsPreviewProps = {
  id: string;
  answers?: TestPreviewDTO;
  questions: QuestionDTO[];
  totalQuestions: number;
  endContent?: React.ReactNode;
  handleFinish?: () => void;
  handleStart?: () => void;
};

export const QuestionsPreview = ({
  id,
  answers,
  questions,
  totalQuestions,
  endContent,
  handleFinish,
  handleStart,
}: QuestionsPreviewProps) => {
  const [currentQuestion, setCurrentQuestion] = useQueryState(
    'question',
    parseAsInteger.withDefault(1).withOptions({ history: 'push' })
  );

  useEffect(() => {
    if (currentQuestion < 1 || currentQuestion > totalQuestions) {
      const validQuestion = Math.min(
        Math.max(currentQuestion, 1),
        totalQuestions
      );
      if (validQuestion !== currentQuestion) {
        setCurrentQuestion(validQuestion);
      }
    }
  }, [currentQuestion, totalQuestions, setCurrentQuestion]);

  if (!questions.length) return null;

  const question = questions[currentQuestion - 1];
  const answer =
    answers && answers.questions.find(a => a.questionId === question.id);

  return (
    <div className="flex flex-col w-full pb-10">
      <div className="w-full max-w-[712px] mb-[8px]">
        <QuestionsPreviewPaginator
          ids={questions.map(q => q.id)}
          current={currentQuestion}
          setCurrent={setCurrentQuestion}
        />
      </div>
      <div className="flex flex-row gap-1 items-start mb-[12px]">
        <div className="w-full max-w-[712px] ">
          <QuestionPreviewCard
            key={question.id}
            question={question}
            answer={answer}
          />
        </div>
        {endContent}
      </div>
      <div className="w-full max-w-[712px]">
        <QuestionsPreviewSwitcher
          id={id}
          current={currentQuestion}
          total={totalQuestions}
          setCurrent={setCurrentQuestion}
          handleFinish={handleFinish}
          handleStart={handleStart}
        />
      </div>
    </div>
  );
};
