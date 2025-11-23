import { getDurationFormat } from '@/shared/common/utils/dayjs';

export interface ITestDurationProps {
  duration: string;
}

export const TestDurationFormatter = ({ duration }: ITestDurationProps) => {
  return (
    <span className="font-semibold hover:animate-pulse underline-offset-4 no-underline hover:underline decoration-dashed decoration-foreground/85">
      {getDurationFormat(duration, 'HH:mm')}
    </span>
  );
};
