import { Button, Card, FileDropArea, Input, Textarea } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useState } from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { Divider } from '@heroui/react';

import { z } from 'zod';
import type { UpdateNewsDto } from '@/entities/news/dtos/update-news.dto';

export const newsSchema = z.object({
  name: z
    .string()
    .min(1, 'Пожалуйста, введите название новости')
    .max(50, 'Название новости не должно превышать 50 символов'),
  shortDescription: z
    .string()
    .min(1, 'Пожалуйста, введите краткое описание новости')
    .max(150, 'Краткое описание новости не должно превышать 150 символов'),
  description: z
    .string()
    .min(1, 'Пожалуйста, введите подробное описание новости')
    .max(1000, 'Подробное описание новости не должно превышать 1000 символов'),
  ownerName: z.string().nonempty().optional(),
  url: z.string().url('Пожалуйста, введите корректный URL'),
  logoPhoto: z.instanceof(File, {
    message: 'Пожалуйста, загрузите логотип новости',
  }),
});

export type NewsFormInputs = z.infer<typeof newsSchema>;

export const AdminNewsForm = ({
  onSubmit,
  isPending,
  defaultData,
}: {
  onSubmit: (data: NewsFormInputs) => Promise<void>;
  isPending: boolean;
  defaultData?: UpdateNewsDto;
}) => {
  const [isFilesDirty, setIsFilesDirty] = useState(false);

  const {
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    trigger,
    formState: { errors, isDirty },
  } = useForm<NewsFormInputs>({
    resolver: zodResolver(newsSchema),
    defaultValues: defaultData,
  });

  const logo = watch('logoPhoto');

  const onFileChange = (file: File, type: 'logoPhoto') => {
    setIsFilesDirty(true);
    setValue(type, file);
    trigger(type);
  };

  const onReset = () => {
    reset();
  };

  const onSubmitHandler: SubmitHandler<NewsFormInputs> = (formData) => {
    onSubmit(formData).then(onReset);
  };

  const isNameError = errors.name !== undefined;
  const isShortDescriptionError = errors.shortDescription !== undefined;
  const isDescriptionError = errors.description !== undefined;
  const isUrlError = errors.url !== undefined;

  const isLogoError = errors.logoPhoto !== undefined;

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="relative p-2">
          <FileDropArea
            withPreview
            filePatterns="image/*"
            classNames={{
              container: clsx('w-full h-[380px]', isLogoError && '!border-rose-400'),
            }}
            currentFile={logo}
            onFileSelect={(file) => onFileChange(file, 'logoPhoto')}
          >
            <MdOutlineAddPhotoAlternate
              className={clsx(
                'group-hover:text-foreground/70 transition-colors',
                isLogoError && 'text-rose-500 group-hover:text-rose-400',
              )}
              size={50}
            />
          </FileDropArea>
        </div>

        <div className="flex flex-col gap-4 px-4 py-5">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-normal">
            <div className="flex w-full flex-col gap-2">
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    color="white"
                    radius="sm"
                    size="md"
                    isInvalid={isNameError}
                    errorMessage={errors.name?.message}
                    {...field}
                    placeholder="Введите название новости"
                  />
                )}
              />

              <Controller
                name="shortDescription"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Textarea
                    minRows={5}
                    maxRows={5}
                    radius="sm"
                    color="white"
                    isInvalid={isShortDescriptionError}
                    errorMessage={errors.shortDescription?.message}
                    {...field}
                    placeholder="Введите краткое описание новости"
                    className="h-full"
                  />
                )}
              />
            </div>
          </div>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Textarea
                fullWidth
                isInvalid={isDescriptionError}
                errorMessage={errors.description?.message}
                {...field}
                placeholder="Введите текст новости"
                minRows={8}
                maxRows={14}
                radius="sm"
                color="white"
              />
            )}
          />

          <Divider className="my-3" />

          <h4 className="font-bold">Дополнительно:</h4>
          <Controller
            name="url"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                color="white"
                radius="sm"
                size="md"
                isInvalid={isUrlError}
                errorMessage={errors.url?.message}
                {...field}
                placeholder="Ссылка на опрос"
              />
            )}
          />
          <div className="mt-4 w-full text-end sm:mt-10">
            <Button
              isDisabled={!isFilesDirty ? !isDirty : !isFilesDirty}
              isLoading={isPending}
              type="submit"
              className="w-full sm:w-[160px]"
              color="gradient"
              size="md"
            >
              Сохранить
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};
