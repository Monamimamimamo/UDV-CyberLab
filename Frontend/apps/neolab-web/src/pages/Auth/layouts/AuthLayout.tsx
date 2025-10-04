import { AuthBackground, AuthFlower } from '@/shared/assets/images';
import { Scrollbar } from '@/shared/ui';
import { Spinner } from '@heroui/react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Scrollbar className="max-h-svh">
      <main className="flex auth-container items-center justify-center">
        <div className="flex lg:flex-row lg:gap-0 gap-[26px] flex-col-reverse items-center xl:justify-between justify-center relative lg:w-full">
          <div className="sm:h-[580px] md:w-[500px] w-full z-10 relative">
            <Suspense
              fallback={
                <div className="flex justify-center items-center md:w-[500px] h-[500px] sm:w-[450px] mobile:w-[400px] w-[300px]">
                  <Spinner color="primary" size="lg" />
                </div>
              }
            >
              <Outlet />
            </Suspense>
            <div className="absolute -bottom-[20px] right-4 sm:flex hidden">
              <img
                src={AuthFlower}
                alt="Auth flower"
                className="w-[235px] select-none pointer-events-none"
              />
            </div>
          </div>
          <div className="w-full flex flex-row lg:justify-end justify-start">
            <div className="text-orange font-w3ip flex flex-col z-10 lg:absolute static -top-[45px]">
              <h2 className="lg:text-[60px] md:text-[32px] text-[26px] lg:leading-[60px] leading-7">
                NEO-Lab
              </h2>
              <p className="lg:text-[32px] md:text-[24px] text-[18px] lg:leading-[32px]">
                Модуль тестирования
              </p>
            </div>
            <div className="absolute lg:-bottom-[97px] lg:top-auto md:-top-14 -top-[50px] lg:-right-[42px] -right-[43px] md:-right-[53px] xl:w-auto lg:w-2/3 ">
              <img
                src={AuthBackground}
                alt="Auth background"
                className="xl:w-[822px] lg:w-full md:w-[260px] w-[230px] select-none pointer-events-none"
              />
            </div>
          </div>
        </div>
      </main>
    </Scrollbar>
  );
};

export default AuthLayout;
