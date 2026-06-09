'use client';

import { forwardRef, ReactNode, Ref, useState } from 'react';
import {
  Label,
  Input as RInput,
  TextArea,
  TextField,
  TextFieldProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import Text from './text';

export interface IInput extends TextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string;
  block?: boolean;
  placeholder?: string;
  endAdornment?: {
    element: ReactNode;
  };
  startAdornment?: {
    element: ReactNode;
  };
  maxLength?: number;
  number?: boolean;
  textArea?: boolean;
  rows?: number;
  ltrRtl?: 'ltr' | 'rtl';
  onSilverBg?: boolean;
  size?: 'normal' | 'small';
}

function Input(props: IInput, ref: Ref<HTMLInputElement>) {
  const {
    maxLength,
    number,
    type,
    label,
    errorMessage,
    isDisabled,
    endAdornment,
    startAdornment,
    textArea,
    rows,
    placeholder,
    description,
    onSilverBg,
    size = 'normal',
    ltrRtl,
  } = props;
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={props.className?.toString()}>
      <TextField
        {...props}
        onChange={value => {
          if (maxLength) {
            if (value.length > maxLength) return;
          }
          if (number) {
            if (isNaN(Number(value)))
              return props?.onChange?.(value.replace(/\D/g, ''));
          }
          props?.onChange?.(value);
        }}
        onFocus={e => {
          props?.onFocus?.(e);
        }}
        onBlur={e => {
          props?.onBlur?.(e);
        }}
        type={showPassword ? 'text' : type}
        aria-label={'input-text-' + props?.name}
      >
        {label && <Label>{label}</Label>}
        <div
          className={twMerge(
            'flex justify-between items-center gap-2 transition-colors duration-200 rounded-2xl min-h-11 border focus-within:border-primary',
            '[&>input]:rounded-2xl [&>input]:min-h-11 [&>input]:w-full [&>input]:px-5',
            size === 'small' && 'min-h-7 text-sm',
            onSilverBg
              ? 'bg-white border-transparent shadow-[22px_10px_23px_0px_rgba(0,0,0,0.25)] hover:border-primary'
              : 'bg-gray-100 border-gray-300 hover:border-primary',
            errorMessage &&
              'border-red-600 hover:border-red-600 focus-within:border-red-600',
            isDisabled &&
              'border-gray-300 text-neutral-400 hover:border-gray-300 focus-within:border-gray-300',
          )}
        >
          {startAdornment && (
            <div className='[&>svg]:!w-5 [&>svg]:!h-5 rtl:pr-5 ltr:pl-5'>
              {startAdornment.element}
            </div>
          )}
          {textArea ? (
            <TextArea rows={rows || 5} />
          ) : (
            <RInput
              ref={ref}
              placeholder={placeholder}
              className={twMerge(
                'outline-0 text-sm',
                ltrRtl === 'ltr'
                  ? 'text-left direction-ltr'
                  : ltrRtl === 'rtl'
                    ? 'text-right direction-rtl'
                    : 'ltr:text-left rtl:text-right',
                'ltr:placeholder:text-left rtl:placeholder:text-right',
              )}
            />
          )}
          {endAdornment && (
            <div className='[&>svg]:!w-5 [&>svg]:!h-5 rtl:pl-5 ltr:pr-5'>
              {endAdornment.element}
            </div>
          )}
          {type === 'password' && (
            <div
              onClick={handleShowPassword}
              className='cursor-pointer flex items-center rtl:pl-5 ltr:pr-5'
            >
              {showPassword ? (
                '(:'
              ) : (
                '):'
              )}
            </div>
          )}
        </div>
      </TextField>
      {description && (
        <Text slot='description' variant='caption' gray>
          {description}
        </Text>
      )}
      {!!errorMessage && (
        <Text variant='caption' color={'text-red-600'} slot='description'>
          {errorMessage}
        </Text>
      )}
    </div>
  );
}

export default forwardRef(Input);
