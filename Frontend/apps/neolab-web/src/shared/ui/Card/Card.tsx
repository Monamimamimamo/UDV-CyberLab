import React, { forwardRef } from 'react';
import clsx from 'clsx';

export const Card = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('bg-white rounded-[20px]', className)}
      {...props}
    >
      {children}
    </div>
  );
});
