import { NewPasswordForm } from '@/widgets/new-password-form';

const NewPasswordPage = () => {
  return (
    <section className="mobile:px-[36px] flex h-full w-full justify-center rounded-[35px] bg-white px-[30px] py-[30px] sm:px-[71px] sm:py-[50px]">
      <div className="z-10 w-full">
        <h1 className="mb-2 text-center text-[24px]">Создать новый пароль</h1>
        <div className="mb-6 text-center text-sm">
          <p>Придумайте новый пароль для входа в аккаунт.</p>
        </div>
        <NewPasswordForm />
      </div>
    </section>
  );
};

export default NewPasswordPage;
