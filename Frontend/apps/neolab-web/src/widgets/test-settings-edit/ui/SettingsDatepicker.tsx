/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZonedDateTime } from '@internationalized/date';
import { DateRangePicker } from '@heroui/react';
import { memo } from 'react';

type TestDate = {
  start: ZonedDateTime;
  end: ZonedDateTime;
};

type SettingsDatepickerProps = {
  testDates: TestDate;
  handleChangeTestDates: (dates: TestDate) => void;
};

export const SettingsDatepicker = memo(
  ({ testDates, handleChangeTestDates }: SettingsDatepickerProps) => {
    return (
      <div className="mb-6">
        <DateRangePicker
          label="Время теста"
          labelPlacement="inside"
          isRequired
          value={testDates as any}
          onChange={e => handleChangeTestDates(e as any)}
          calendarProps={{
            classNames: {
              title: 'text-[15px] text-foreground',
              prevButton: 'text-foreground/80 data-[hover=true]:bg-second/10',
              nextButton: 'text-foreground/80 data-[hover=true]:bg-second/10',
              gridHeaderCell: 'text-foreground/80',
              cellButton:
                'data-[outside-month=true]:text-second/40 data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:bg-main-gradient data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:bg-second-gradient data-[selected=true]:data-[range-selection=true]:before:bg-second/15 data-[selected=true]:data-[range-selection=true]:text-foreground hover:bg-second/10 data-[outside-month=true]:hover:bg-transparent',
            },
          }}
          errorMessage="Неверный формат даты и времени теста"
          classNames={{
            timeInput: 'text-[16px] text-foreground',
            selectorIcon:
              'text-foreground/90 group-data-[invalid=true]:text-rose-500',
          }}
          radius="sm"
          size="lg"
          aria-label="Время"
        />
      </div>
    );
  }
);
