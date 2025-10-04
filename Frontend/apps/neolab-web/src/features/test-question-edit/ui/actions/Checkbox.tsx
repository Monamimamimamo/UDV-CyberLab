import { Button, Checkbox, CheckboxGroup } from '@/shared/ui';
import { IoAdd } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import type { VariantQuestionDTO } from '@/shared/api/dto';
import { InputWithFocus } from './InputWithFocus';

export const CheckboxAction = ({
  question,
  changeQuestion,
}: {
  question: VariantQuestionDTO;
  changeQuestion: (value: Partial<VariantQuestionDTO>) => void;
}) => {
  const handleAddNewAnswer = () => {
    changeQuestion({
      stringAnswers: [
        ...question.stringAnswers,
        `Вариант ${question.stringAnswers?.length + 1}`,
      ],
    });
  };

  const handleDeleteAnswer = (index: number) => {
    const arr = question.stringAnswers;
    changeQuestion({
      correctAnswers: question.correctAnswers.filter(i => i !== index),
      stringAnswers: [...arr.slice(0, index), ...arr.slice(index + 1)],
    });
  };

  const handleChangeAnswer = (index: number, value: string) => {
    changeQuestion({
      stringAnswers: question.stringAnswers.map((answer, i) =>
        i === index ? value : answer
      ),
    });
  };

  const handleCheckAnswers = (answers: number[]) => {
    changeQuestion({
      correctAnswers: answers,
    });
  };

  return (
    <>
      {question?.stringAnswers ? (
        <>
          <CheckboxGroup
            value={question.correctAnswers.map(String) ?? []}
            onValueChange={e => handleCheckAnswers(e.map(Number))}
          >
            {question.stringAnswers?.map((answer: string, index: number) => (
              <div
                key={index + answer}
                className="flex justify-between items-center"
              >
                <Checkbox
                  color="success"
                  classNames={{
                    icon: 'text-white',
                  }}
                  radius="sm"
                  size="md"
                  value={String(index)}
                />
                <InputWithFocus
                  value={answer}
                  onChange={value => handleChangeAnswer(index, value)}
                />
                <Button
                  isIconOnly
                  radius="sm"
                  variant="light"
                  size="sm"
                  onPress={() => handleDeleteAnswer(index)}
                >
                  <IoMdClose size={16} />
                </Button>
              </div>
            ))}
          </CheckboxGroup>
          <Button
            radius="sm"
            variant="light"
            className="text-[13px] mt-2"
            size="sm"
            onPress={handleAddNewAnswer}
            startContent={<IoAdd size={16} />}
          >
            Добавить
          </Button>
        </>
      ) : (
        <div className="text-center text-second">
          <p>Варианты ответов на вопрос отсутствуют</p>
          <Button
            radius="sm"
            variant="light"
            className="text-[13px] mt-2"
            size="sm"
            onPress={handleAddNewAnswer}
          >
            Добавить
          </Button>
        </div>
      )}
    </>
  );
};
