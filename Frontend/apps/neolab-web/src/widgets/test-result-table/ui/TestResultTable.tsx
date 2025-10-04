import type { ITestResult } from '@/entities/test-info';
import { getPercentage } from '@/shared/common/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';
import { useNavigate } from 'react-router-dom';

const tableClassNames = {
  wrapper: 'p-2',
  row: 'hover:outline-none',
  th: 'bg-secondary font-bold text-[16px] text-foreground',
  td: 'group-data-[odd=true]:before:bg-secondary text-[16px]',
  tr: 'px-5 outline-none outline-offset-1 outline-4 hover:outline-second/40 rounded-md',
};

export const TestResultTable = ({ results }: { results: ITestResult }) => {
  const navigate = useNavigate();

  return (
    <Table
      shadow="none"
      radius="none"
      classNames={tableClassNames}
      isStriped
      aria-label="Test Answers Overview"
    >
      <TableHeader>
        <TableColumn className="pl-[40px]">№ попытки</TableColumn>
        <TableColumn>Баллы</TableColumn>
      </TableHeader>
      <TableBody emptyContent="Нет результатов" items={results.attempts}>
        {({ attemptId, attempt, score, maxScore }) => (
          <TableRow
            className="cursor-pointer"
            onClick={() =>
              navigate(`/tests/${results.testId}/results/${attemptId}`)
            }
            key={attemptId}
          >
            <TableCell className="pl-[40px] w-1/2">{attempt}</TableCell>
            <TableCell>{getPercentage(score, maxScore)}%</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
