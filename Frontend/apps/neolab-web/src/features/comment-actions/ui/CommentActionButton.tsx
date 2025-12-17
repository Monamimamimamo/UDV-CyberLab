import { Button, type ButtonProps } from '@/shared/ui';

export const CommentActionButton = (props: ButtonProps) => {
  return (
    <Button
      type="button"
      fullWidth
      variant="light"
      size="md"
      radius="sm"
      {...props}
      className={`flex justify-start ${props.className}`}
    />
  );
};
