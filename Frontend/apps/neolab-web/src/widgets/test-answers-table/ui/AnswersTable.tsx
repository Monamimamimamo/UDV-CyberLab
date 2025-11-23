import type { SavedAnswerWithKey } from '@/entities/test-passing';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';
import clsx from 'clsx';
import { useNavigate, useParams } from 'react-router-dom';

const tableClassNames = {
  wrapper: 'p-2',
  th: 'bg-secondary font-bold sm:text-[16px] text-[14px] text-foreground',
  td: 'group-data-[odd=true]:before:bg-secondary sm:text-[16px] text-[14px]',
  tr: 'px-5 outline-none outline-offset-1 outline-4 hover:outline-second/40 rounded-md',
};

export const AnswersTable = ({
  answers,
}: {
  answers: SavedAnswerWithKey[];
}) => {
  const navigate = useNavigate();
  const { testId } = useParams();

  const questions = answers.map(answer => Boolean(answer.data));

  return (
    <Table
      shadow="none"
      radius="none"
      classNames={tableClassNames}
      isStriped
      aria-label="Test Answers Overview"
    >
      <TableHeader>
        <TableColumn className="pl-[40px]">Вопрос</TableColumn>
        <TableColumn>Состояние</TableColumn>
      </TableHeader>
      <TableBody emptyContent="Нет результатов">
        {questions.map((has, index) => (
          <TableRow
            className="cursor-pointer"
            onClick={() => navigate(`/tests/${testId}?question=${index + 1}`)}
            key={index}
          >
            <TableCell className="w-1/2 pl-[40px]">{index + 1}</TableCell>
            <TableCell
              className={clsx(
                has ? 'text-foreground font-medium' : 'text-foreground/30'
              )}
            >
              {has ? 'Ответ записан' : 'Нет ответа'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
