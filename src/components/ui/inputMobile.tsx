'use client';
import Icon from '@/components/ui/Icon';
import country from '@/public/assets/meta/countryCodes.json';
import Image from 'next/image';
import React, { forwardRef, ReactNode, Ref } from 'react';
import type { ListBoxItemProps } from 'react-aria-components';
import {
  Autocomplete,
  Button,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  SearchField,
  Select,
  TextField,
  TextFieldProps,
  useFilter,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import Text from './text';

export interface IInput extends TextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string;
  block?: boolean;
  placeholder?: string;
  maxLength?: number;
  number?: boolean;
  ltrRtl?: 'ltr' | 'rtl';
  size?: 'normal' | 'small';
  codeValue?: string;
  onChangeCodeValue?: (code: string) => void;
}

function InputMobile(props: IInput, ref: Ref<HTMLDivElement>) {
  const {
    maxLength,
    number,
    label,
    errorMessage,
    isDisabled,
    placeholder,
    description,
    size = 'normal',
    codeValue,
    onChangeCodeValue,
    ltrRtl,
  } = props;
  const { contains } = useFilter({ sensitivity: 'base' });

  function SelectItem(props: ListBoxItemProps & { children: ReactNode }) {
    const childrenArray = React.Children.toArray(props.children);
    return (
      <ListBoxItem
        {...props}
        textValue={
          childrenArray.find(child => typeof child === 'string') as
            | string
            | undefined
        }
        className='group flex items-center gap-2 cursor-default select-none py-2 px-4 outline-hidden rounded-lg text-gray-900 focus:bg-[#FFF4D3] focus:text-white'
      >
        {({ isSelected }) => (
          <>
            <Text
              slot='label'
              className='flex-1 flex items-center gap-2 truncate font-normal group-selected:font-medium'
            >
              {childrenArray}
            </Text>
            <Text
              slot='description'
              className='w-5 flex items-center text-sky-600 group-focus:text-white'
            >
              {isSelected && <Icon icon='checkmark' size='S' />}
            </Text>
          </>
        )}
      </ListBoxItem>
    );
  }

  return (
    <div>
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
        onKeyDown={event =>
          ['e', 'E', '+', '-'].includes(event.key) && event.preventDefault()
        }
        type='number'
        ref={ref}
      >
        {label && <Label>{label}</Label>}
        <div
          className={twMerge(
            'w-full flex ltr:flex-row-reverse items-center gap-2 bg-gray-100 border-gray-300 hover:border-primary transition-colors duration-200 rounded-2xl min-h-11 border focus-within:border-primary',
            size === 'small' && 'min-h-7 text-sm',
            errorMessage &&
              'border-red-600 hover:border-red-600 focus-within:border-red-600',
            isDisabled &&
              'border-gray-300 text-neutral-400 hover:border-gray-300 focus-within:border-gray-300',
          )}
        >
          <Input
            placeholder={placeholder}
            className={twMerge(
              ltrRtl === 'ltr'
                ? 'text-left direction-ltr'
                : ltrRtl === 'rtl'
                  ? 'text-right direction-rtl'
                  : 'ltr:text-left rtl:text-right',
              'w-full outline-0 text-sm px-4 text-left placeholder:text-right',
            )}
          />
          <div className='flex justify-center'>
            <Select
              selectedKey={codeValue}
              onSelectionChange={key => {
                const selectedItem = country.find(item => item.code === key);
                if (selectedItem) {
                  onChangeCodeValue?.(
                    selectedItem.code + selectedItem.dial_code,
                  );
                }
              }}
              className='flex flex-col gap-1 relative'
            >
              <Button className='flex items-center cursor-default rounded-l-2xl border-r-1 border-gray-300 bg-white transition py-2 pl-4 pr-2 text-base text-left leading-normal ring-1 ring-black/5 text-gray-700 focus:outline-hidden focus-visible:outline-2 outline-black outline-offset-3 focus-visible:ring-black/25'>
                {codeValue}
              </Button>
              <Popover
                placement='bottom left'
                className='!max-h-80 flex flex-col rounded-2xl bg-white text-base shadow:[0px_0px_4px_0px_rgba(0,0,0,0.25)]
                ring-1 ring-black/5 entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out'
              >
                <Autocomplete filter={contains}>
                  <SearchField
                    aria-label='Search'
                    autoFocus
                    className='group flex items-center bg-white forced-colors:bg-[Field] border border-gray-400 has-focus:border-sky-600 rounded-full m-1'
                  >
                    <Icon
                      icon='search'
                      size={20}
                      className='mx-2 text-gray-600 forced-colors:text-[ButtonText]'
                    />
                    <Input className='px-2 py-1 flex-1 min-w-0 border-none outline-0 bg-white text-base text-gray-800 placeholder-gray-500 font-[inherit] [&::-webkit-search-cancel-button]:hidden' />
                    <Button
                      aria-label='Apply search filter'
                      className='text-sm text-center transition rounded-full border-0 p-1 flex items-center justify-center text-gray-600 bg-transparent hover:bg-black/[5%] pressed:bg-black/10 mr-1 w-6 group-empty:invisible'
                    >
                      <Icon icon='cross1' size={10} />
                    </Button>
                  </SearchField>
                  <ListBox
                    items={country}
                    className='outline-hidden p-1 overflow-auto flex-1 overflow-y-scroll scroll-bar rounded-md'
                  >
                    {item => (
                      <SelectItem id={item.code}>
                        <Image
                          src={`/assets/flags/${item.code}.png`}
                          width={16}
                          height={12}
                          alt={item.faName}
                        />
                        {item.faName}
                      </SelectItem>
                    )}
                  </ListBox>
                </Autocomplete>
              </Popover>
            </Select>
          </div>
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

export default forwardRef(InputMobile);
