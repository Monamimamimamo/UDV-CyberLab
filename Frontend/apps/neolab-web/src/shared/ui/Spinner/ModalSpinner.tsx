import { Spinner } from './Spinner';

export const ModalSpinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-10">
      <Spinner color="white" size="lg" />
    </div>
  );
};
