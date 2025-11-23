import type { TestAttemptDTO } from '@/entities/test-info';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

const tableClassNames = {
  wrapper: 'p-2',
  row: 'hover:outline-none',
  th: 'bg-secondary font-bold text-[16px] text-foreground',
  td: 'group-data-[odd=true]:before:bg-secondary text-[16px]',
  tr: 'px-5 outline-none outline-offset-1 outline-4 hover:outline-second/40 rounded-md',
};

export const TestAttemptTable = ({
  result,
  testId,
}: {
  result: TestAttemptDTO;
  testId: string;
}) => {
  const navigate = useNavigate();
  return (
    <Table
      shadow="none"
      radius="none"
      classNames={tableClassNames}
      isStriped
      aria-label="Test Attempt"
    >
      <TableHeader>
        <TableColumn className="pl-[40px]">Вопрос</TableColumn>
        <TableColumn>Баллы</TableColumn>
      </TableHeader>
      <TableBody emptyContent="Нет результатов" items={result.questions}>
        <>
          {result.questions.map((question, index) => (
            <TableRow
              className="cursor-pointer"
              onClick={() =>
                navigate(
                  `/tests/${testId}/results/${result.id}/preview?question=${index + 1}`
                )
              }
              key={question.id}
            >
              <TableCell className="pl-[40px] w-1/2">{index + 1}</TableCell>
              <TableCell
                className={clsx(
                  'text-red-300',
                  question.scoredPoints === question.maxPoints &&
                    'text-green-500',
                  question.scoredPoints === 0 && 'text-red-500'
                )}
              >
                {question.scoredPoints}/{question.maxPoints}
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="cursor-pointer">
            <TableCell className="pl-[40px] w-1/2 font-bold">Всего</TableCell>
            <TableCell className=" font-bold">
              {result.scoredPoints}/{result.maxPoints}
            </TableCell>
          </TableRow>
        </>
      </TableBody>
    </Table>
  );
};
