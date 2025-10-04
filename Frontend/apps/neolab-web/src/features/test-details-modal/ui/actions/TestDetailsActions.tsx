import { getTestStatus, type ITestDetails } from '@/entities/test-info';
import { OwnerActions } from './OwnerActions';
import { ResumeAction } from './ResumeAction';
import { StartAction } from './StartAction';
import { FinishedActions } from './FinishedActions';

type TestDetailsActionsProps = ITestDetails & {
  testStatus: ReturnType<typeof getTestStatus>;
  isExpired: boolean;
};

export const TestDetailsActions = ({
  id,
  leftAttempts,
  testStatus: { isOwner, isRunning, isOver },
  isExpired,
}: TestDetailsActionsProps) => {
  const hasAttempts = Boolean(leftAttempts && leftAttempts > 0);

  if (isOwner) return <OwnerActions testId={id} />;
  if (isOver) return <FinishedActions withRepeat={hasAttempts && !isExpired} testId={id} />;
  if (isExpired) return <TestExpired />;
  if (isRunning) return <ResumeAction testId={id} />;

  return <StartAction testId={id} />;
};

const TestExpired = () => (
  <div className="flex items-center justify-center font-bold">Тестирование завершено!</div>
);
