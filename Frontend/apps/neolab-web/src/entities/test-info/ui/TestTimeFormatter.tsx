import { getDateFormat } from '@/shared/common/utils/dayjs';

export interface ITestTimeProps {
  time: string;
}

export const TestTimeFormatter = ({ time }: ITestTimeProps) => {
  return (
    <span className="font-semibold hover:animate-pulse underline-offset-4 no-underline hover:underline decoration-dashed decoration-foreground/85">
      {getDateFormat(time, 'DD.MM.YYYY HH:mm')}
    </span>
  );
};
