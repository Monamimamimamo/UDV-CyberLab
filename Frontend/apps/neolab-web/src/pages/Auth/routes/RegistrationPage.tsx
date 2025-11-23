import { RegistrationForm } from '@/widgets/registration-form';

const RegistrationPage = () => {
  return (
    <section className="sm:py-[50px] py-[30px] h-full w-full sm:px-[71px] mobile:px-[36px] px-[30px] rounded-[35px] bg-white flex justify-center">
      <div className="z-10">
        <h1 className="text-[24px] mb-5 text-center">Регистрация</h1>
        <RegistrationForm />
      </div>
    </section>
  );
};

export default RegistrationPage;
