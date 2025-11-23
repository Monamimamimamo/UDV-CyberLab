import { getDurationFormat } from '@/shared/common/utils/dayjs';
import { useTestFinish } from '../api/mutations/useFinishTest';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type TestTimerProps = {
  time: string;
  testId: string;
};

const getTimerDuration = (time: string) =>
  Math.max(0, new Date(time).getTime() - Date.now());

export const TestTimer = ({ time, testId }: TestTimerProps) => {
  const [formattedTime, setFormattedTime] = useState<string | number>(
    getTimerDuration(time)
  );
  const { mutateAsync } = useTestFinish();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const duration = Math.max(0, getTimerDuration(time));
      setFormattedTime(duration);
      if (duration <= 0) {
        mutateAsync(testId).then(() => navigate(`/tests/${testId}/results`));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-[16px] text-center">
      {getDurationFormat(formattedTime, 'HH:mm:ss')}
    </p>
  );
};
