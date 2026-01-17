import { getPercentage } from '@/shared/common/utils';
import { Card } from '@/shared/ui';
import { Progress } from '@heroui/react';
import { TestTimer } from './TestTimer';
import type { SavedAnswerWithKey } from '../model/dto';

type TestStatusProps = {
  testId: string;
  totalQuestions: number;
  leftTestTime?: string;
  savedAnswers?: SavedAnswerWithKey[];
};

export const TestStatus = ({
  testId,
  totalQuestions,
  leftTestTime,
  savedAnswers,
}: TestStatusProps) => {
  const questionsResolved =
    savedAnswers?.reduce((acc, answer) => acc + (answer.data ? 1 : 0), 0) ?? 0;

  console.log(questionsResolved);

  return (
    <Card className="flex h-[40px] w-1/2 flex-row justify-between gap-1 !rounded-[8px] px-[15px] py-[6px] sm:h-[70px] sm:w-[90px] sm:flex-col sm:gap-0 sm:px-[6px]">
      <div className="w-1/2 sm:w-full">
        <Progress
          aria-label="Test Progress"
          size="sm"
          radius="sm"
          classNames={{
            indicator: 'bg-main-gradient h-[6px]',
            track: 'h-[6px]',
            base: 'h-[6px]',
          }}
          value={getPercentage(questionsResolved, totalQuestions)}
        />
        <p className="text-center text-[12px]">
          {getPercentage(questionsResolved, totalQuestions)}%
        </p>
      </div>
      {leftTestTime && <TestTimer testId={testId} time={leftTestTime} />}
    </Card>
  );
};
