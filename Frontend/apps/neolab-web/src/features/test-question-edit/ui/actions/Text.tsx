import type { OpenQuestionDTO } from '@/shared/api/dto';
import { InputWithFocus } from './InputWithFocus';

export const TextAction = ({
  question,
  changeQuestion,
}: {
  question: OpenQuestionDTO;
  changeQuestion: (value: Partial<OpenQuestionDTO>) => void;
}) => {
  const handleChangeAnswer = (value: string) => {
    changeQuestion({ answer: value });
  };

  return (
    <div>
      <InputWithFocus value={question.answer} onChange={handleChangeAnswer} />

      {/* //TODO_1 Доделать */}
      {/* <div className="flex flex-row gap-2 items-center mb-3">
        <span className="text-[13px]">Начислять баллы за любой ответ</span>
        <Switch
          size="sm"
          classNames={{
            thumb:
              'bg-foreground group-data-[selected=true]:bg-controls-primary',
            wrapper:
              'bg-controls-primary group-data-[selected=true]:bg-foreground',
          }}
          aria-label="Automatic updates"
        />
      </div>
      <div>
        {correctAnswers?.length ? (
          <>
            <p className="text-second text-[13px] my-2">
              Принимаемые варианты ответа:
            </p>
            <ul className="flex flex-col gap-2">
              {correctAnswers?.map((answer, index) => (
                <li key={index} className="flex flex-row gap-2 items-center">
                  <Input
                    value={answer}
                    onValueChange={value => handleChangeAnswer(index, value)}
                    className="w-full mr-2"
                    variant="underlined"
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
                </li>
              ))}
            </ul>
            <Button
              radius="sm"
              variant="light"
              className="text-[13px] mt-2"
              size="sm"
              onPress={() =>
                handleAddNewAnswer(`Вариант ${correctAnswers?.length + 1}`)
              }
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
              onPress={() => handleAddNewAnswer('Вариант 1')}
            >
              Добавить
            </Button>
          </div>
        )}
      </div> */}
    </div>
  );
};
