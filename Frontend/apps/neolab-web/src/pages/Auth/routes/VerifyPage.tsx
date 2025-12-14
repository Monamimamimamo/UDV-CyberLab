import { useConfirmEmail } from '@/entities/user';
import { NeolabCompleteIcon } from '@/shared/assets/svgs';
import { CHAR_NO_BREAK_SPACE } from '@/shared/common/consts';
import { Button, Spinner } from '@/shared/ui';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const VerifyPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { confirmEmail, isPending, error } = useConfirmEmail();
  const [isSuccess, setIsSuccess] = useState(false);
  const [redirectSeconds, setRedirectSeconds] = useState(5);
  const [hasRequested, setHasRequested] = useState(false);
  const userId = searchParams.get('userId');
  const token = searchParams.get('token');

  useEffect(() => {
    if (userId && token && !hasRequested) {
      setHasRequested(true);
      confirmEmail({ userId, token }).then(() => {
        setIsSuccess(true);
      });
    }
  }, [userId, token, confirmEmail, hasRequested]);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 3000);

      const interval = setInterval(() => {
        setRedirectSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [isSuccess, navigate]);

  const onLoginClick = () => navigate('/login');

  if (isPending) {
    return (
      <section className="mobile:px-[36px] flex h-full w-full justify-center rounded-[35px] bg-white px-[30px] py-[30px] sm:px-[71px] sm:py-[50px]">
        <div className="z-10 flex w-full flex-col items-center justify-center">
          <Spinner color="primary" size="lg" />
          <p className="text-foreground/70 mt-5 text-sm">Подтверждение email...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mobile:px-[36px] flex h-full w-full justify-center rounded-[35px] bg-white px-[30px] py-[30px] sm:px-[71px] sm:py-[50px]">
        <div className="z-10 flex w-full flex-col items-center text-center">
          <h1 className="mb-5 text-[24px]">Ошибка подтверждения</h1>
          <div className="flex flex-col items-center text-center text-sm">
            <p>Не удалось подтвердить email. Возможно, ссылка устарела или неверна.</p>
          </div>
          <Button color="gradient" fullWidth type="button" onClick={onLoginClick} className="mt-5">
            Войти
          </Button>
        </div>
      </section>
    );
  }

  if (!userId || !token) {
    return (
      <section className="mobile:px-[36px] flex h-full w-full justify-center rounded-[35px] bg-white px-[30px] py-[30px] sm:px-[71px] sm:py-[50px]">
        <div className="z-10 flex w-full flex-col items-center text-center">
          <h1 className="mb-5 text-[24px]">Неверная ссылка</h1>
          <div className="flex flex-col items-center text-center text-sm">
            <p>Отсутствуют необходимые параметры для подтверждения email.</p>
          </div>
          <Button color="gradient" fullWidth type="button" onClick={onLoginClick} className="mt-5">
            Войти
          </Button>
        </div>
      </section>
    );
  }

  if (isSuccess) {
    return (
      <section className="mobile:px-[36px] flex h-full w-full justify-center rounded-[35px] bg-white px-[30px] py-[30px] sm:px-[71px] sm:py-[50px]">
        <div className="z-10 flex w-full flex-col items-center text-center">
          <h1 className="mb-5 text-[24px]">Email подтвержден!</h1>
          <div className="flex flex-col items-center text-center text-sm">
            <p>Ваш email успешно подтвержден.</p>
            <p>
              Перенаправление на страницу входа через{CHAR_NO_BREAK_SPACE}
              {redirectSeconds}...
            </p>
          </div>
          <NeolabCompleteIcon className="text-background my-10 max-w-[174px]" />
          <Button color="gradient" fullWidth type="button" onClick={onLoginClick}>
            Войти
          </Button>
        </div>
      </section>
    );
  }

  return null;
};

export default VerifyPage;
