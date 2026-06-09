'use client';

import { forwardRef, ReactNode, Ref } from 'react';
import { Placement } from 'react-aria';
import {
  ButtonProps,
  Button as RAButton,
  Tooltip,
  TooltipTrigger,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import Loading from '../common/fetchLoading';

interface IButton extends ButtonProps {
  loading?: boolean;
  variant?:
    | 'primary'
    | 'secondary'
    | 'primaryOutline'
    | 'secondaryOutline'
    | 'infoOutline'
    | 'error'
    | 'warning'
    | 'info'
    | 'fade'
    | 'success';
  iconButton?: boolean;
  block?: boolean;
  icon?: ReactNode;
  iconEnd?: boolean;
  rounded?: boolean;
  size?: 'normal' | 'small';
  form?: string;
  tooltip?: {
    content: ReactNode;
    placement?: Placement;
    delay?: number;
    closeDelay?: number;
  };
  children?: ReactNode;
}

function Button(props: IButton, ref: Ref<HTMLButtonElement>) {
  const { variant = 'primary', size = 'normal' } = props;

  const btn = (
    <RAButton
      {...props}
      ref={ref}
      isDisabled={props.isDisabled || props.loading}
      form={props.form}
      type={props.type}
      className={twMerge(
        `min-h-11 rounded-2xl p-1.5 min-w-32 w-fit cursor-pointer flex items-center justify-center transition-colors duration-200 gap-1 lg:text-base text-sm`,
        props.iconButton && 'p-1.5 min-w-fit min-h-fit ',
        !!props.block && 'w-full',
        size === 'small' && 'min-h-7 min-w-24 text-sm',
        variant === 'primary' &&
          'bg-primary text-white hover:bg-primaryLight pressed:bg-primaryDark disabled:bg-gray-200 disabled:text-neutral-400',
        variant === 'secondary' &&
          'bg-secondary text-slate-950 hover:bg-secondaryLight pressed:bg-secondaryDark disabled:bg-gray-200 disabled:text-neutral-400',
        variant === 'primaryOutline' &&
          'border-2 border-primary text-slate-950 hover:bg-primary hover:text-white pressed:bg-primaryDark pressed:text-white disabled:bg-gray-200 disabled:text-neutral-400',
        variant === 'secondaryOutline' &&
          'border-2 border-secondary text-slate-950 hover:bg-secondaryLight pressed:bg-secondaryDark disabled:bg-gray-200 disabled:text-neutral-400',
        variant === 'infoOutline' &&
          'border-2 border-blue-600 text-slate-950 hover:bg-blue-200 pressed:text-white pressed:bg-blue-900 disabled:bg-gray-200 disabled:text-neutral-400',
        variant === 'error' &&
          'bg-red-600 text-white hover:bg-red-300 pressed:bg-red-900 disabled:bg-gray-200 disabled:text-neutral-400',
        variant === 'success' &&
          'bg-green-600 text-white hover:bg-green-200 hover:text-slate-950 pressed:bg-green-800 disabled:bg-gray-200 disabled:text-neutral-400',
        variant === 'warning' &&
          'bg-yellow-300 text-slate-950 hover:bg-yellow-100 pressed:bg-yellow-600 disabled:bg-gray-200 disabled:text-neutral-400',
        variant === 'info' &&
          'bg-blue-600 text-white hover:bg-blue-200 pressed:bg-blue-900 disabled:bg-gray-200 disabled:text-neutral-400',
        variant === 'fade' && '',
        props.className?.toString(),
      )}
    >
      {!props?.loading && props.icon && !props.iconEnd && props.icon}
      {!!props?.loading ? <Loading type='btn' /> : props.children}
      {!props?.loading && props.icon && props.iconEnd && props.icon}
    </RAButton>
  );

  if (props.tooltip) {
    return (
      <TooltipTrigger
        delay={props.tooltip.delay || 200}
        closeDelay={props.tooltip.closeDelay || 0}
      >
        {btn}
        <Tooltip placement={props.tooltip.placement}>
          {props.tooltip.content}
        </Tooltip>
      </TooltipTrigger>
    );
  }

  return btn;
}

export default forwardRef(Button);
