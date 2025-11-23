import { Select, SelectItem } from '@/shared/ui';
import { questionTypes } from '../const/questionTypes';
import type { QuestionType } from '@/shared/api/dto';
import { memo } from 'react';

type QuestionTypeEditProps = {
  handleChangeType: (value: QuestionType) => void;
  questionType: QuestionType;
  isMultipleChoice: boolean;
};

const selectClassNames = {
  itemClasses: {
    base: 'data-[hover=true]:bg-controls data-[selectable=true]:focus:text-foreground data-[hover=true]:text-foreground data-[selectable=true]:focus:bg-controls',
  },
};

export const QuestionTypeEdit = memo(
  ({ questionType, handleChangeType, isMultipleChoice }: QuestionTypeEditProps) => {
    return (
      <div className="mb-[13px] flex flex-row items-center justify-between">
        <Select
          color="white"
          aria-label="Тип вопроса"
          size="sm"
          listboxProps={selectClassNames}
          popoverProps={{
            placement: 'bottom-end',
          }}
          selectedKeys={[
            questionType !== 'QuestionVariant'
              ? questionType
              : isMultipleChoice
                ? 'QuestionVariantMultiply'
                : (questionType ?? ''),
          ]}
          onChange={(e) => handleChangeType(e.target.value as QuestionType)}
          placeholder="Тип вопроса"
          className="w-full sm:max-w-[213px]"
          classNames={{
            trigger: 'h-[40px] min-h-8 px-3',
            value: 'text-[13px] text-foreground/50',
            mainWrapper: 'h-[40px]',
          }}
        >
          {questionTypes.map(({ label, key }) => (
            <SelectItem key={key}>{label}</SelectItem>
          ))}
        </Select>
      </div>
    );
  },
);
