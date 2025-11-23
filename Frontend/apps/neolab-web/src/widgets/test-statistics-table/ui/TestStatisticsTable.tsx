import type { ITestStatistics } from '@/entities/test-info';
import { getPercentage } from '@/shared/common/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';
import { useLocation, useNavigate } from 'react-router-dom';

const tableClassNames = {
  wrapper: 'p-2',
  row: 'hover:outline-none',
  th: 'bg-secondary font-bold sm:text-[16px] text-[14px] text-foreground',
  td: 'group-data-[odd=true]:before:bg-secondary sm:text-[16px] text-[14px]',
  tr: 'px-5 outline-none outline-offset-1 outline-4 hover:outline-second/40 rounded-md',
};

export const TestStatisticsTable = ({
  results,
  testId,
}: {
  testId: string;
  results: ITestStatistics;
}) => {
  const { pathname } = useLocation();
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
        <TableColumn className="sm:pl-[40px] pl-5">№</TableColumn>
        <TableColumn className="sm:pl-[40px] pl-5">Студент</TableColumn>
        <TableColumn>Баллы</TableColumn>
      </TableHeader>
      <TableBody emptyContent="Нет результатов">
        {results.users.map((user, index) => (
          <TableRow
            onClick={() =>
              navigate(`/tests/${testId}/results/${user.attemptId}`, {
                state: {
                  from: pathname,
                },
              })
            }
            className="cursor-pointer"
            key={index}
          >
            <TableCell className="sm:pl-[40px] pl-5">{index + 1}</TableCell>
            <TableCell className="sm:pl-[40px] pl-5">{user.name}</TableCell>
            <TableCell>
              {getPercentage(user.score, results.maxScore)}%
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
