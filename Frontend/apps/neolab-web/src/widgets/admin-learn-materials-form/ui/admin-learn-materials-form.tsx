import type { UpdateLearnMaterialDto } from '@/entities/learn-materials/dtos/update-learn-material.dto';
import { Button, Card, FileDropArea, Input, Select, SelectItem, Textarea } from '@/shared/ui';
import { Divider } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { z } from 'zod';

const publicationTypeOptions = [
  { key: 'video', label: 'Видео' },
  { key: 'article', label: 'Статья' },
  { key: 'document', label: 'Документ' },
];

export const learnMaterialSchema = z.object({
  name: z
    .string()
    .min(1, 'Пожалуйста, введите название учебного материала')
    .max(50, 'Название учебного материала не должно превышать 50 символов'),
  shortDescription: z
    .string()
    .min(1, 'Пожалуйста, введите краткое описание учебного материала')
    .max(150, 'Краткое описание учебного материала не должно превышать 150 символов'),
  description: z
    .string()
    .min(1, 'Пожалуйста, введите подробное описание учебного материала')
    .max(1000, 'Подробное описание учебного материала не должно превышать 1000 символов'),
  ownerName: z.string().nonempty().optional(),
  url: z.string().url('Пожалуйста, введите корректный URL'),
  publicationType: z.string().min(1, 'Пожалуйста, выберите тип публикации'),
  logoPhoto: z.instanceof(File, {
    message: 'Пожалуйста, загрузите логотип учебного материала',
  }),
});

export type LearnMaterialFormInputs = z.infer<typeof learnMaterialSchema>;

const selectClassNames = {
  itemClasses: {
    base: 'data-[hover=true]:bg-controls data-[selectable=true]:focus:text-foreground data-[hover=true]:text-foreground data-[selectable=true]:focus:bg-controls',
  },
};

export const AdminLearnMaterialsForm = ({
  onSubmit,
  isPending,
  defaultData,
}: {
  onSubmit: (data: LearnMaterialFormInputs) => Promise<void>;
  isPending: boolean;
  defaultData?: UpdateLearnMaterialDto;
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
  } = useForm<LearnMaterialFormInputs>({
    resolver: zodResolver(learnMaterialSchema),
    defaultValues: defaultData,
  });

  const logo = watch('logoPhoto');
  const publicationType = watch('publicationType');

  const onFileChange = (file: File, type: 'logoPhoto') => {
    setIsFilesDirty(true);
    setValue(type, file);
    trigger(type);
  };

  const onReset = () => {
    reset();
  };

  const onSubmitHandler: SubmitHandler<LearnMaterialFormInputs> = (formData) => {
    onSubmit(formData).then(onReset);
  };

  const isNameError = errors.name !== undefined;
  const isShortDescriptionError = errors.shortDescription !== undefined;
  const isDescriptionError = errors.description !== undefined;
  const isUrlError = errors.url !== undefined;
  const isPublicationTypeError = errors.publicationType !== undefined;
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
                    placeholder="Введите название учебного материала"
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
                    placeholder="Введите краткое описание учебного материала"
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
                placeholder="Введите описание учебного материала"
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
            name="publicationType"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                color="white"
                aria-label="Выберите тип публикации"
                size="lg"
                listboxProps={selectClassNames}
                popoverProps={{
                  placement: 'bottom-start',
                }}
                selectedKeys={[publicationType ?? '']}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder="Выберите тип публикации"
                classNames={{
                  value: 'text-[14px] text-foreground/50',
                }}
                isInvalid={isPublicationTypeError}
                errorMessage={errors.publicationType?.message}
              >
                {publicationTypeOptions.map(({ key, label }) => (
                  <SelectItem key={key}>{label}</SelectItem>
                ))}
              </Select>
            )}
          />

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
                placeholder="Ссылка на материал"
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
