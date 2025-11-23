import { useTimerRedirect } from '@/shared/hooks';

export const NotFoundPage = () => {
  const redirectSeconds = useTimerRedirect('/', 3);

  return (
    <section className="h-[calc(100vh-80px)] flex justify-center items-center text-foreground">
      <div className="flex flex-col gap-1 items-center">
        <div className="bg-main-gradient bg-clip-text text-transparent font-w3ip text-[40px]">
          <h2>404</h2>
        </div>
        <div className="text-center">
          <p className="text-[22px]">Страница не найдена!</p>
          <p className="text-[14px] text-foreground/50">
            Перенаправление через {redirectSeconds}...
          </p>
        </div>
      </div>
    </section>
  );
};
