import type { ITestDetails } from '../model/types/ITestDetails';
import { TestIcon } from '@/shared/assets/svgs';
import { TestTimeFormatter } from './TestTimeFormatter';
import { getTestStatus } from '../';
import { CircularProgress } from '@/shared/ui';
import { getPercentage } from '@/shared/common/utils';
import { TestAttemptsStatus } from './TestAttemptsStatus';
import { TestDurationFormatter } from './TestDurationFormatter';

type TestDetailsProps = ITestDetails & {
  testStatus: ReturnType<typeof getTestStatus>;
};

const progressStyles = 'sm:w-[184px] sm:h-[184px] h-[150px] w-[150px]';

export const TestDetails = ({
  title,
  startDate,
  endDate,
  subject,
  difficulty,
  leftAttempts,
  totalPoints,
  currentPoints,
  duration,
  testStatus: { isRunning, isOwner },
}: TestDetailsProps) => {
  const progress = currentPoints ? getPercentage(currentPoints, totalPoints) : 0;

  return (
    <div>
      <div className="flex flex-row items-start justify-center gap-4">
        <TestIcon className="hidden h-auto w-[60px] sm:block sm:w-[73px]" />
        <div className="flex flex-col sm:gap-[14px]">
          <div>
            <h3 className="mobile:text-[28px] mb-[8px] line-clamp-3 text-[24px] leading-[28px] font-medium sm:text-[32px] sm:leading-[39px]">
              {title}
            </h3>
            <p className="text-[14px] leading-[24px] sm:text-[16px] md:text-[20px]">
              Открыт с <TestTimeFormatter time={startDate} /> до{' '}
              <TestTimeFormatter time={endDate} />
            </p>
          </div>
          <div className="flex flex-col justify-between gap-[15px] sm:flex-row">
            <div className="mt-[20px] flex flex-col gap-[8px] text-[16px] leading-[20px] sm:mt-[30px] sm:text-[20px] sm:leading-[24px]">
              <p>
                Тематика: <span className="font-semibold">{subject}</span>
              </p>
              <p>
                Сложность: <span className="font-semibold">{difficulty}</span>
              </p>
              {duration && (
                <p>
                  Длительность:{' '}
                  <span className="font-semibold">
                    <TestDurationFormatter duration={duration} />
                  </span>
                </p>
              )}
              <p>
                Макс. баллов: <span className="font-semibold">{totalPoints}</span>
              </p>
              {!isOwner && <TestAttemptsStatus leftAttempts={leftAttempts} />}
            </div>
            <div className="flex justify-center">
              {!isOwner && (
                <CircularProgress
                  aria-label="text progress"
                  className={isRunning ? 'animate-pulse' : ''}
                  classNames={{
                    base: progressStyles,
                    svg: progressStyles,
                    svgWrapper: progressStyles,
                    value: 'sm:text-[40px] text-[30px]',
                  }}
                  value={progress}
                  showValueLabel
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
