import { type ITestCard, TestStatus } from '@/entities/test-info';

type TestStatusOptions = {
  userId?: string;
};

type TestStatusResult = {
  isOwner: boolean;
  isRunning: boolean;
  isOver: boolean;
  isIdle: boolean;
};

export const getTestStatus = (
  { owner, status }: Pick<ITestCard, 'owner' | 'status'>,
  options?: TestStatusOptions,
): TestStatusResult => {
  const isOwner = owner === options?.userId;
  const isRunning = status === TestStatus.RUN;
  const isOver = status === TestStatus.OVER;
  const isIdle = status === TestStatus.IDLE;

  return { isOwner, isRunning, isOver, isIdle };
};
