import { NeolabCompleteIcon } from '@/shared/assets/svgs';
import { Button } from '@/shared/ui';
import { useNavigate } from 'react-router-dom';

const NewPasswordSuccessPage = () => {
  const navigate = useNavigate();

  const onLoginClick = () => navigate('/login');

  return (
    <section className="mobile:px-[36px] flex h-full w-full justify-center rounded-[35px] bg-white px-[30px] py-[30px] sm:px-[71px] sm:py-[50px]">
      <div className="z-10 flex w-full flex-col items-center text-center">
        <h1 className="mb-5 text-[24px]">Ваш пароль обновлен!</h1>
        <div className="flex flex-col items-center text-center text-sm">
          <p>Изменение пароля выполнено успешно.</p>
          <p>Через несколько секунд вы сможете войти, используя новый пароль</p>
        </div>
        <NeolabCompleteIcon className="text-background my-10 max-w-[174px]" />
        <Button color="gradient" fullWidth type="button" onClick={onLoginClick}>
          Войти в аккаунт
        </Button>
      </div>
    </section>
  );
};

export default NewPasswordSuccessPage;
