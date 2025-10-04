import { getPercentage } from '@/shared/common/utils';
import { useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChartTooltip } from './ChartTooltip';
import type { ITestResult } from '@/entities/test-info';

export const TestResultChart = ({ results }: { results: ITestResult }) => {
  // const navigate = useNavigate();
  const data = useMemo(
    () =>
      results.attempts.map((item) => ({
        id: item.attempt,
        attemptId: item.attemptId,
        value: getPercentage(item.score, item.maxScore),
      })),
    [results.attempts],
  );

  return (
    <ResponsiveContainer className="mt-1 sm:mt-[20px]" width="100%" height={360}>
      <LineChart
        margin={{ top: 40, right: 30, left: 0, bottom: 25 }}
        onClick={(e) => {
          if (e.activeLabel) {
            // TODO console.log или откат на 2 мажорную
            // navigate(`/tests/${results.testId}/results/${e.activePayload?.[0].payload.attemptId}`);
          }
        }}
        data={data}
      >
        <XAxis
          dataKey="id"
          type="number"
          ticks={data.length > 5 ? data.map((_, index) => index + 1) : [1, 2, 3, 4, 5]}
          tickCount={data.length > 5 ? data.length : 5}
          domain={['dataMin', 'dataMax']}
          label={{
            value: 'Попытки',
            position: 'bottom',
            offset: 0,
            fill: '#9599CC',
            fontSize: 16,
          }}
          tick={{
            fontSize: 14,
            fill: '#343976',
          }}
        />

        <YAxis
          ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          tick={{
            fontSize: 14,
            fill: '#343976',
          }}
          label={{
            value: 'Баллы',
            position: 'top',
            offset: 20,
            fill: '#9599CC',
            fontSize: 16,
          }}
        />
        <CartesianGrid horizontal={false} stroke="#9599CC" strokeDasharray="8 5" />
        <Tooltip content={<ChartTooltip />} />

        <Line
          activeDot={{ r: 6, fill: '#9599CC' }}
          type="monotone"
          dataKey="value"
          stroke="#343976"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
