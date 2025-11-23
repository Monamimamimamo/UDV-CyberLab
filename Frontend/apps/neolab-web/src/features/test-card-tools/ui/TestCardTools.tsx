import { getTestStatus, type ITestCard } from '@/entities/test-info';
import { ToolsPopover } from './owner/ToolsPopover';
import { CircularProgress } from '@/shared/ui';
import { getPercentage } from '@/shared/common/utils';
import { useAuth } from '@/entities/user';

type TestCardProps = {
  test: ITestCard;
};

export const TestCardTools = ({ test }: TestCardProps) => {
  const userId = useAuth((state) => state.user?.userId);
  const { isOwner, isRunning, isOver } = getTestStatus(test, {
    userId,
  });

  if (isOwner) return <ToolsPopover id={test.id} />;

  if (isRunning) return <CircularProgress aria-label="progress" strokeWidth={2.5} />;

  if (isOver && test.currentPoints !== undefined && test.totalPoints)
    return (
      <CircularProgress
        aria-label="progress"
        value={getPercentage(test.currentPoints, test.totalPoints)}
        showValueLabel
        strokeWidth={2.5}
        formatOptions={{ style: 'decimal' }}
      />
    );

  return null;
};
