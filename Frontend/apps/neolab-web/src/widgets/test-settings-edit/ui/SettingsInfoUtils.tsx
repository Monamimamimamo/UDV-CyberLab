/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from '@/shared/ui';
import { Time } from '@internationalized/date';
import { Switch, TimeInput } from '@heroui/react';
import { memo } from 'react';

type SettingsInfoUtilsProps = {
  isLimited: boolean;
  withTimeLimit: boolean;
  attemptsCount: number;
  testDuration: Time | null;
  handleChangeWithTimeLimit: (value: boolean) => void;
  handleChangeAttemptsCount: (value: number) => void;
  handleChangeTestDuration: (value: Time | null) => void;
};

export const SettingsInfoUtils = memo(
  ({
    isLimited,
    withTimeLimit,
    attemptsCount,
    testDuration,
    handleChangeAttemptsCount,
    handleChangeWithTimeLimit,
    handleChangeTestDuration,
  }: SettingsInfoUtilsProps) => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-2 items-center">
            <p>Ограничить количество попыток</p>
            <Switch
              isSelected
              isDisabled
              size="sm"
              classNames={{
                thumb:
                  'bg-foreground group-data-[selected=true]:bg-controlsPrimary',
                wrapper:
                  'bg-controlsPrimary group-data-[selected=true]:bg-foreground',
              }}
              aria-label="Automatic updates"
            />
          </div>
          {isLimited && (
            <div className="flex flex-row gap-3 items-center">
              <p className="text-[14px] text-foreground/70">
                Количество попыток:
              </p>
              <Input
                value={String(attemptsCount)}
                onChange={e =>
                  handleChangeAttemptsCount(Number(e.target.value))
                }
                isRequired
                color="white"
                size="sm"
                classNames={{
                  base: 'w-[60px]',
                }}
                type="number"
                max={100}
                min={1}
                aria-label="Количество попыток"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-2 items-center">
            <p>Ограничить по времени</p>
            <Switch
              isSelected={withTimeLimit}
              onChange={e => handleChangeWithTimeLimit(e.target.checked)}
              size="sm"
              classNames={{
                thumb:
                  'bg-foreground group-data-[selected=true]:bg-controlsPrimary',
                wrapper:
                  'bg-controlsPrimary group-data-[selected=true]:bg-foreground',
              }}
              aria-label="Automatic updates"
            />
          </div>
          {withTimeLimit && (
            <div className="flex flex-row gap-3 items-center">
              <p className="text-[14px] text-foreground/70">
                Длительность теста:
              </p>
              <TimeInput
                value={testDuration as any}
                onChange={(e: any) => {
                  handleChangeTestDuration(e);
                }}
                isRequired
                className="w-[60px]"
                hideTimeZone
                hourCycle={24}
                size="sm"
                classNames={{
                  inputWrapper:
                    'hover:bg-controls focus-within:hover:bg-controls',
                  input: 'text-[16px] text-foreground justify-center',
                }}
                aria-label="Длительность теста"
              />
            </div>
          )}
        </div>
      </div>
    );
  }
);
