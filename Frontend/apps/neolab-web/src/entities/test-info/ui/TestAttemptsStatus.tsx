type TestAttemptsStatusProps = {
  leftAttempts?: number;
};

export const TestAttemptsStatus = ({
  leftAttempts = 0,
}: TestAttemptsStatusProps) => {
  return (
    <>
      {leftAttempts ? (
        <p>
          Осталось попыток:{' '}
          <span className="font-semibold">{leftAttempts}</span>
        </p>
      ) : (
        <p className="mt-3 rounded-[6px] py-2 px-2 text-center text-rose-400 text-[15px] border-dashed border-rose-400/50 border-[2px]">
          Попытки закончились
        </p>
      )}
      {/* TODO_1 добавить если появится */}
      {/* ) : (
        <p className="mt-3 rounded-[6px] py-2 px-2 text-center text-green-400 text-[15px] border-dashed border-green-400/50 border-[2px]">
          Число попыток не ограничено
        </p>
      )} */}
    </>
  );
};
