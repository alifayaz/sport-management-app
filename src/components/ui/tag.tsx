import React from 'react';
import { twMerge } from 'tailwind-merge';
import Text from './text';

const Tag: React.FC<{
  color?: string;
  text: string;
  className?: string;
  variant?: 'active' | 'deActive' | 'error' | 'default';
  size?: 'normal' | 'small';
}> = props => {
  const { className, text, variant = 'default', size = 'normal' } = props;
  return (
    <div
      className={twMerge(
        className,
        'rounded-t-2xl ltr:rounded-bl-2xl rtl:rounded-br-2xl text-center',
        size === 'normal' && 'px-8 py-2 min-w-[110px] w-fit',
        size === 'small' && 'px-4 py-1',
        variant === 'active' && 'bg-green-200 text-green-800',
        variant === 'deActive' && 'bg-slate-200 text-slate-500',
        variant === 'error' && 'bg-red-200 text-red-900',
        variant === 'default' && 'bg-primaryBrighter text-primaryDark',
      )}
    >
      <Text
        variant={size === 'normal' ? 'body' : 'body2'}
        className='text-inherit'
      >
        {text}
      </Text>
    </div>
  );
};

export default Tag;
