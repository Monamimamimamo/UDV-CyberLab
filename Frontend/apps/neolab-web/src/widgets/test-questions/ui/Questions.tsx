import { parseAsInteger, useQueryState } from 'nuqs';
import { useEffect, useMemo } from 'react';
import { QuestionsPaginator } from './QuestionsPaginator';
import { QuestionCard } from '@/entities/test-question';
import { QuestionsSwitcher } from './QuestionsSwitcher';
import { useMediaQuery } from '@/shared/hooks';
import type { QuestionDTO } from '@/shared/api/dto';
import type { SavedAnswer, SavedAnswerWithKey } from '@/entities/test-passing';

type QuestionsProps = {
  id: string;
  attemptTestId: string;
  questions: QuestionDTO[];
  answers: SavedAnswerWithKey[];
  savedAnswers: SavedAnswer[];
  totalQuestions: number;
  endContent?: React.ReactNode;
};

export const Questions = ({
  id,
  attemptTestId,
  questions,
  savedAnswers,
  answers,
  totalQuestions,
  endContent,
}: QuestionsProps) => {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const [currentQuestion, setCurrentQuestion] = useQueryState(
    'question',
    parseAsInteger.withDefault(1).withOptions({ history: 'push' }),
  );

  const question = useMemo(() => questions[currentQuestion - 1], [currentQuestion, questions]);

  const answer = useMemo(
    () =>
      answers.find((a) => a.id === question.id)?.data ||
      savedAnswers.find((a) => a.questionId === question.id) ||
      null,
    [question, answers, savedAnswers],
  );

  useEffect(() => {
    if (currentQuestion < 1 || currentQuestion > totalQuestions) {
      const validQuestion = Math.min(Math.max(currentQuestion, 1), totalQuestions);
      if (validQuestion !== currentQuestion) {
        setCurrentQuestion(validQuestion);
      }
    }
  }, [currentQuestion, totalQuestions, setCurrentQuestion]);

  if (!questions.length) return null;

  return (
    <div className="flex w-full flex-col pb-10">
      <div className="mb-2 w-full max-w-[712px]">
        <QuestionsPaginator current={currentQuestion} setCurrent={setCurrentQuestion} />
      </div>
      {isMobile && <div className="mb-2">{endContent}</div>}
      <div className="mb-[12px] flex flex-row items-start gap-1">
        <div className="w-full max-w-[712px]">
          <QuestionCard
            savedAnswer={answer}
            key={question.id}
            testId={id}
            attemptTestId={attemptTestId}
            question={question}
          />
        </div>
        {!isMobile && endContent}
      </div>
      <div className="w-full max-w-[712px]">
        <QuestionsSwitcher
          id={id}
          current={currentQuestion}
          total={totalQuestions}
          setCurrent={setCurrentQuestion}
        />
      </div>
    </div>
  );
};
