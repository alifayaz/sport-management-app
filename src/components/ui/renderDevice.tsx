import React, { ReactNode, FC } from 'react';
import { twMerge } from 'tailwind-merge';

const RenderDevice: FC<{
  children?: ReactNode;
  className?: string;
  isMobile?: boolean;
}> = props => {
  const { children, isMobile, className = '' } = props;
  return isMobile ? (
    <section className={twMerge(className, 'lg:hidden flex')}>
      {children}
    </section>
  ) : (
    <section className={twMerge(className, 'lg:flex hidden')}>
      {children}
    </section>
  );
};

export default RenderDevice;
