import { ResetPasswordForm } from '@/widgets/reset-password-form';

const ResetPasswordPage = () => {
  return (
    <section className="mobile:px-[36px] flex h-full w-full justify-center rounded-[35px] bg-white px-[30px] py-[30px] sm:px-[71px] sm:py-[50px]">
      <div className="z-10 w-full">
        <h1 className="mb-5 text-center text-[24px]">Восстановление пароля</h1>
        <div className='text-sm text-center mb-6'>
          <p>Не переживайте — такое бывает!</p>
          <p>Введите свой e-mail и мы отправим вам ссылку для сброса пароля</p>
        </div>
        <ResetPasswordForm />
      </div>
    </section>
  );
};

export default ResetPasswordPage;
