/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card } from '@/shared/ui';
import { useCallback, useEffect, useRef, useState } from 'react';
import { parseAbsoluteToLocal, parseTime, Time, ZonedDateTime } from '@internationalized/date';
import { useUpdateTestSettings } from '../api/mutations/useUpdateTestSettings';
import { SettingsInfoUtils } from './SettingsInfoUtils';
import { SettingsDatepicker } from './SettingsDatepicker';
import { getTestInfo, type TestEditingDTO } from '@/entities/test-editing';
import type { UpdateTestDTO } from '@/entities/test-info';

type TestDate = {
  start: ZonedDateTime;
  end: ZonedDateTime;
};

export const TestSettings = ({ data }: { data: TestEditingDTO }) => {
  const { mutate } = useUpdateTestSettings(data.id);
  const ref = useRef<UpdateTestDTO | null>(null);
  const [isLimited, _] = useState<boolean>(true);
  const [withTimeLimit, setWithTimeLimit] = useState<boolean>(Boolean(data.passTestTime));

  const [testDates, setTestDates] = useState<{
    start: ZonedDateTime;
    end: ZonedDateTime;
  }>({
    start: parseAbsoluteToLocal(data.startTestTime),
    end: parseAbsoluteToLocal(data.endTestTime),
  });

  const [attemptsCount, setAttemptsCount] = useState<number>(data.attemptsCount);

  const [testDuration, setTestDuration] = useState<Time | null>(
    data.passTestTime ? parseTime(data.passTestTime) : null,
  );

  const handleChangeWithTimeLimit = useCallback(
    (value: boolean) => {
      ref.current = {
        ...getTestInfo(data),
        attemptsCount,
        startTestTime: testDates.start.toAbsoluteString(),
        endTestTime: testDates.end.toAbsoluteString(),
        passTestTime: value ? data.passTestTime : undefined,
      };
      setWithTimeLimit(value);
    },
    [attemptsCount, data, testDates.end, testDates.start],
  );

  const handleChangeTestDuration = useCallback(
    (value: Time | null) => {
      ref.current = {
        ...getTestInfo(data),
        attemptsCount,
        startTestTime: testDates.start.toAbsoluteString(),
        endTestTime: testDates.end.toAbsoluteString(),
        passTestTime: value?.toString(),
      };
      setTestDuration(value);
    },
    [attemptsCount, data, testDates.end, testDates.start],
  );

  const handleChangeAttemptsCount = useCallback(
    (value: number) => {
      ref.current = {
        ...getTestInfo(data),
        attemptsCount: value,
        startTestTime: testDates.start.toAbsoluteString(),
        endTestTime: testDates.end.toAbsoluteString(),
        passTestTime: withTimeLimit ? testDuration?.toString() : undefined,
      };
      setAttemptsCount(value);
    },
    [data, testDates.end, testDates.start, testDuration, withTimeLimit],
  );

  const handleChangeTestDates = useCallback(
    (dates: TestDate) => {
      ref.current = {
        ...getTestInfo(data),
        attemptsCount,
        passTestTime: withTimeLimit ? testDuration?.toString() : undefined,
        startTestTime: dates.start.toAbsoluteString(),
        endTestTime: dates.end.toAbsoluteString(),
      };
      setTestDates(dates);
    },
    [attemptsCount, data, testDuration, withTimeLimit],
  );

  useEffect(() => {
    return () => {
      if (ref.current) {
        mutate(ref.current);
      }
    };
  }, [mutate]);

  return (
    <Card className="p-[25px] sm:p-[40px]">
      <SettingsDatepicker testDates={testDates} handleChangeTestDates={handleChangeTestDates} />
      <SettingsInfoUtils
        isLimited={isLimited}
        withTimeLimit={withTimeLimit}
        testDuration={testDuration}
        attemptsCount={attemptsCount}
        handleChangeWithTimeLimit={handleChangeWithTimeLimit}
        handleChangeTestDuration={handleChangeTestDuration}
        handleChangeAttemptsCount={handleChangeAttemptsCount}
      />
    </Card>
  );
};
