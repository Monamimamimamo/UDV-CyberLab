import { AuthBackground, AuthFlower } from '@/shared/assets/images';
import { Scrollbar, Spinner } from '@/shared/ui';
import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const AuthLayout = () => {
  const location = useLocation();

  return (
    <Scrollbar className="max-h-svh">
      <main className="auth-container flex items-center justify-center">
        <div className="relative flex flex-col-reverse items-center justify-center gap-[26px] lg:w-full lg:flex-row lg:gap-0 xl:justify-between">
          <div className="relative z-10 w-full sm:h-[580px] md:w-[500px]">
            <Suspense
              key={location.pathname}
              fallback={
                <div className="mobile:w-[400px] flex h-[500px] w-[300px] items-center justify-center sm:w-[450px] md:w-[500px]">
                  <Spinner color="primary" size="lg" />
                </div>
              }
            >
              <Outlet />
            </Suspense>
            <div className="absolute right-4 -bottom-[20px] hidden sm:flex">
              <img
                src={AuthFlower}
                alt="Auth flower"
                className="pointer-events-none w-[235px] select-none"
              />
            </div>
          </div>
          <div className="flex w-full flex-row justify-start lg:justify-end">
            <div className="text-orange font-w3ip static -top-[45px] z-10 flex flex-col lg:absolute">
              <h2 className="text-[26px] leading-7 md:text-[32px] lg:text-[60px] lg:leading-[60px]">
                NEO-Lab
              </h2>
              <p className="text-[18px] md:text-[24px] lg:text-[32px] lg:leading-[32px]">
                Модуль тестирования
              </p>
            </div>
            <div className="absolute -top-[50px] -right-[43px] md:-top-14 md:-right-[53px] lg:top-auto lg:-right-[42px] lg:-bottom-[97px] lg:w-2/3 xl:w-auto">
              <img
                src={AuthBackground}
                alt="Auth background"
                className="pointer-events-none w-[230px] select-none md:w-[260px] lg:w-full xl:w-[822px]"
              />
            </div>
          </div>
        </div>
      </main>
    </Scrollbar>
  );
};

export default AuthLayout;
