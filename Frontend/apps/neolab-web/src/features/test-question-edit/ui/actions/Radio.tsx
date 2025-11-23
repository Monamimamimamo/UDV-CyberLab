import type { VariantQuestionDTO } from '@/shared/api/dto';
import { Button, Radio, RadioGroup } from '@/shared/ui';
import { IoMdClose } from 'react-icons/io';
import { IoAdd } from 'react-icons/io5';
import { InputWithFocus } from './InputWithFocus';

export const RadioAction = ({
  question,
  changeQuestion,
}: {
  question: VariantQuestionDTO;
  changeQuestion: (value: Partial<VariantQuestionDTO>) => void;
}) => {
  const handleAddNewAnswer = () => {
    changeQuestion({
      stringAnswers: [...question.stringAnswers, `Вариант ${question.stringAnswers?.length + 1}`],
    });
  };

  const handleDeleteAnswer = (index: number) => {
    const arr = question.stringAnswers;
    changeQuestion({
      correctAnswers: question.correctAnswers.filter((i) => i !== index),
      stringAnswers: [...arr.slice(0, index), ...arr.slice(index + 1)],
    });
  };

  const handleChangeAnswer = (index: number, value: string) => {
    changeQuestion({
      stringAnswers: question.stringAnswers.map((answer, i) => (i === index ? value : answer)),
    });
  };

  const handleCheckAnswer = (answer: number) => {
    changeQuestion({
      correctAnswers: [answer],
    });
  };

  return (
    <>
      {question?.stringAnswers ? (
        <>
          <RadioGroup
            value={String(question.correctAnswers[0]) || ''}
            onValueChange={(e) => handleCheckAnswer(Number(e))}
          >
            {question.stringAnswers?.map((answer: string, index: number) => (
              <div key={index + answer} className="flex items-center justify-between">
                <Radio color="success" key={index} value={String(index)} />
                <InputWithFocus
                  value={answer}
                  onChange={(value) => handleChangeAnswer(index, value)}
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
          </RadioGroup>
          <Button
            radius="sm"
            variant="light"
            className="mt-2 text-[13px]"
            size="sm"
            onPress={handleAddNewAnswer}
            startContent={<IoAdd size={16} />}
          >
            Добавить
          </Button>
        </>
      ) : (
        <div className="text-second text-center">
          <p>Варианты ответов на вопрос отсутствуют</p>
          <Button
            radius="sm"
            variant="light"
            className="mt-2 text-[13px]"
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
