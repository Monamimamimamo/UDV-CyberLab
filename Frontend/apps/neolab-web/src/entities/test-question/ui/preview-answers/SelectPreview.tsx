import type { PreviewQuestionDTO } from '@/entities/test-info';
import type { ComplianceQuestionDTO } from '@/shared/api/dto';
import { useMediaQuery } from '@/shared/hooks';
import { Select, SelectItem } from '@/shared/ui';

export const PreviewSelectAnswer = ({
  question,
  previewAnswer,
}: {
  previewAnswer?: PreviewQuestionDTO;
  question: ComplianceQuestionDTO;
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <>
      {Object.entries(question.compliances).map(([key, title]) => (
        <div key={key} className="flex flex-col gap-1">
          <p>{title}</p>
          <Select
            classNames={{
              value:
                previewAnswer?.userCompliances[key] &&
                previewAnswer?.userCompliances[key] ===
                  previewAnswer?.correctCompliances[key]
                  ? 'group-data-[has-value=true]:text-green-500'
                  : 'group-data-[has-value=true]:text-rose-500',
            }}
            size="sm"
            listboxProps={{
              itemClasses: {
                base: 'data-[hover=true]:bg-[#CDCDE3] data-[selectable=true]:focus:text-foreground data-[hover=true]:text-foreground data-[selectable=true]:focus:bg-[#CDCDE3]',
              },
            }}
            popoverProps={{
              placement: isMobile ? 'top-start' : 'right-start',
            }}
            selectedKeys={[previewAnswer?.userCompliances[key] || '']}
            label="Выбрать ответ"
            className="sm:max-w-[300px] w-full"
          >
            {question.variants[key].map(item => (
              <SelectItem key={item}>{item}</SelectItem>
            ))}
          </Select>
        </div>
      ))}
    </>
  );
};
