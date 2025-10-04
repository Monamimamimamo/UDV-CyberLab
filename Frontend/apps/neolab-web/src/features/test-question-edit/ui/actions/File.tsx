import { Switch } from '@heroui/react';

export const FileAction = () => {
  return (
    <div>
      <div className="flex flex-row gap-2 items-center">
        <span className="text-[13px]">Начислять баллы без проверки</span>
        <Switch
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
      <p className="text-second text-[13px] mt-2">
        Можно загружать файлы в формате SVG, PNG, JPG, PDF
      </p>
    </div>
  );
};
