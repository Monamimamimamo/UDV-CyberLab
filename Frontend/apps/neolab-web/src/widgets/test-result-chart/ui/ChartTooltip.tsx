export const ChartTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: { id: number; value: number } }>;
}) => {
  if (!active || !payload || !payload.length) return null;

  const { id, value } = payload[0].payload;

  return (
    <div className="bg-white p-3 rounded shadow-lg text-sm">
      <p className="font-bold">Попытка: {id}</p>
      <p>Баллы: {value}%</p>
    </div>
  );
};
