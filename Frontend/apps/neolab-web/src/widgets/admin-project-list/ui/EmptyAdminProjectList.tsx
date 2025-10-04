export const EmptyAdminProjectList = () => {
  return (
    <div className="flex justify-center mt-2 w-full">
      <div className="max-w-[400px] w-full flex flex-col items-center">
        <p className="text-foreground font-w3ip text-3xl bg-main-gradient text-transparent bg-clip-text">
          404
        </p>
        <p className="text-second mb-3">Проекты не найдены</p>
      </div>
    </div>
  );
};
