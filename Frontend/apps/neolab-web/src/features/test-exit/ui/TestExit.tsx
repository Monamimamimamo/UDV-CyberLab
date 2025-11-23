import { Button, Card } from '@/shared/ui';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

export const TestExit = ({ id }: { id: string }) => {
  const navigate = useNavigate();

  return (
    <Card className="sm:w-[90px] w-1/2 sm:h-[70px] h-[40px] rounded-[8px] flex flex-col justify-between p-1">
      <Button
        onPress={() => navigate(`/tests/${id}/overview`)}
        className="rounded-[8px] sm:p-0 px-6 h-full min-w-0 bg-white hover:bg-background/50"
      >
        <div className='flex sm:flex-col flex-row sm:gap-0 gap-1 items-center'>
          <p className="text-[13px]">Завершить</p>
          <IoClose className='sm:text-[32px] text-[20px]' />
        </div>
      </Button>
    </Card>
  );
};
