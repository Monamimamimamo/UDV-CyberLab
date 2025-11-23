import type { SavedAnswer, SavedComplianceAnswerDTO } from '@/entities/test-passing';
import type { ComplianceQuestionDTO } from '@/shared/api/dto';
import { useMediaQuery } from '@/shared/hooks';
import { Select, SelectItem } from '@/shared/ui';

export const SelectAnswer = ({
  question,
  setCurrentAnswer,
  currentAnswer,
}: {
  question: ComplianceQuestionDTO;
  setCurrentAnswer: (answer: SavedAnswer) => void;
  currentAnswer?: SavedComplianceAnswerDTO | null;
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>, key: string) => {
    if (setCurrentAnswer) {
      setCurrentAnswer({
        questionId: question.id,
        userCompliances: {
          ...currentAnswer?.userCompliances,
          [key]: event.target.value,
        },
      });
    }
  };

  return (
    <>
      {Object.entries(question.compliances).map(([key, title]) => (
        <div key={key} className="flex flex-col gap-1">
          <p>{title}</p>
          <Select
            size="sm"
            listboxProps={{
              itemClasses: {
                base: 'data-[hover=true]:bg-[#CDCDE3] data-[selectable=true]:focus:text-foreground data-[hover=true]:text-foreground data-[selectable=true]:focus:bg-[#CDCDE3]',
              },
            }}
            popoverProps={{
              placement: isMobile ? 'top-start' : 'right-start',
            }}
            selectedKeys={[currentAnswer ? currentAnswer.userCompliances[key] : '']}
            onChange={(e) => handleChange(e, key)}
            label="Выбрать ответ"
            className="w-full sm:max-w-[300px]"
          >
            {question.variants[key].map((item) => (
              <SelectItem key={item}>{item}</SelectItem>
            ))}
          </Select>
        </div>
      ))}
    </>
  );
};
