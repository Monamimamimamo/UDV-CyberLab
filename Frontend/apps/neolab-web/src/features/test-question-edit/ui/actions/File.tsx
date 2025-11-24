import { Switch } from '@heroui/react';

export const FileAction = () => {
  return (
    <div>
      <div className="flex flex-row items-center gap-2">
        <span className="text-[13px]">Начислять баллы без проверки</span>
        <Switch
          size="sm"
          classNames={{
            thumb: 'bg-foreground group-data-[selected=true]:bg-controls-primary',
            wrapper: 'bg-controls-primary group-data-[selected=true]:bg-foreground',
          }}
          aria-label="Automatic updates"
        />
      </div>
      <p className="text-second mt-2 text-[13px]">
        Можно загружать файлы в формате SVG, PNG, JPG, PDF
      </p>
    </div>
  );
};
