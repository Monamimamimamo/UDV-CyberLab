import { NeolabSendEmailIcon } from '@/shared/assets/svgs';
import { CHAR_NO_BREAK_SPACE } from '@/shared/common/consts';
import { Link } from 'react-router-dom';

const RegisterSuccessPage = () => {
  return (
    <section className="mobile:px-[36px] flex h-full w-full justify-center rounded-[35px] bg-white px-[30px] py-[30px] sm:px-[71px] sm:py-[50px]">
      <div className="z-10 flex w-full flex-col items-center text-center">
        <h1 className="mb-5 text-[24px]">Письмо отправлено!</h1>
        <div className="flex flex-col items-center text-center text-sm">
          <p>
            Проверьте почту и перейдите по{CHAR_NO_BREAK_SPACE}ссылке{CHAR_NO_BREAK_SPACE}в
            {CHAR_NO_BREAK_SPACE}письме для подтверждения email
          </p>
          <p>Не забудьте про папку «Спам», возможно письмо прячется там!</p>
        </div>
        <NeolabSendEmailIcon className="text-background my-10 max-w-[174px]" />
        <p className="text-small">
          После подтверждения email вы сможете{CHAR_NO_BREAK_SPACE}
          <Link
            to="/login"
            className="text-link hover:text-orange custom-outline rounded-sm transition duration-200"
          >
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterSuccessPage;

