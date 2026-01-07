import { Button, type ButtonProps } from '@/shared/ui';

export const ActionButton = ({ className, ...props }: ButtonProps) => {
  return (
    <Button
      type="button"
      fullWidth
      variant="light"
      size="md"
      radius="sm"
      className={`justify-start ${className}`}
      {...props}
    />
  );
};
