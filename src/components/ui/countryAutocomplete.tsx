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
import { useLocale } from 'next-intl';

export interface IInput extends TextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  size?: 'normal' | 'small';
  onSilverBg?: boolean;
}

function CustomAutocomplete(props: IInput, ref: Ref<HTMLDivElement>) {
  const {
    label,
    errorMessage,
    isDisabled,
    placeholder,
    description,
    size = 'normal',
    value,
    onChange,
    onSilverBg,
  } = props;
  const { contains } = useFilter({ sensitivity: 'base' });
  const local = useLocale();

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
        className=' group flex items-center gap-2 cursor-default select-none py-2 px-4 outline-hidden rounded-lg text-gray-900 focus:bg-[#FFF4D3] focus:text-white'
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
    <div className={props.className?.toString()}>
      <TextField
        {...props}
        onFocus={e => {
          props?.onFocus?.(e);
        }}
        onBlur={e => {
          props?.onBlur?.(e);
        }}
        type='text'
        ref={ref}
      >
        {label && <Label>{label}</Label>}
        <div
          className={twMerge(
            'w-full flex ltr:flex-row-reverse items-center gap-2 hover:border-primary transition-colors duration-200 rounded-2xl min-h-11 border border-gray-300 focus-within:border-primary',
            size === 'small' && 'min-h-7 text-sm',
            errorMessage &&
              'border-red-600 hover:border-red-600 focus-within:border-red-600',
            isDisabled &&
              'border-gray-300 text-neutral-400 hover:border-gray-300 focus-within:border-gray-300',
          )}
        >
          <Select
            selectedKey={value}
            onSelectionChange={key => {
              const selectedItem = country.find(item => item?.code === key);
              if (selectedItem) {
                onChange?.(selectedItem?.iso3);
              }
            }}
            className='w-full flex flex-col gap-1 relative'
            aria-label='country-auto-complete'
          >
            <Button
              className={twMerge(
                `w-full flex items-center justify-between cursor-default rounded-2xl bg-white transition
                  py-2 px-4 text-base text-left leading-normal ring-1 ring-black/5 text-gray-700 focus:outline-hidden
                  focus-visible:outline-2 outline-black outline-offset-3 focus-visible:ring-black/25`,
                'bg-gray-100 border-gray-300 hover:border-primary',
                onSilverBg &&
                  'bg-white border-transparent shadow-[22px_10px_23px_0px_rgba(0,0,0,0.25)] hover:border-primary',
              )}
            >
              {value
                ? local === 'fa'
                  ? country.find(v => v.iso3 === value)?.faName
                  : country.find(v => v.iso3 === value)?.enName
                : placeholder}
              <Icon icon='arrowDown' size={13} />
            </Button>
            <Popover
              placement='bottom left'
              className={twMerge(
                '!max-h-80 flex flex-col rounded-2xl bg-white text-base shadow:[0px_0px_4px_0px_rgba(0,0,0,0.25)]',
                'ring-1 ring-black/5 entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out',
                'w-[var(--trigger-width)]',
              )}
            >
              <Autocomplete filter={contains}>
                <SearchField
                  aria-label='Search'
                  autoFocus
                  className='w-full group flex items-center bg-white forced-colors:bg-[Field] border border-gray-300 has-focus:border-sky-600 rounded-full m-1'
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
                  className='w-full outline-hidden p-1 overflow-auto flex-1 overflow-y-scroll scroll-bar rounded-md'
                >
                  {item => (
                    <SelectItem id={item?.code} className={'w-full'}>
                      {item?.code && (
                        <Image
                          src={`/assets/flags/${item.code}.png`}
                          width={16}
                          height={12}
                          alt={local === 'fa' ? item?.faName : item?.enName}
                        />
                      )}
                      {local === 'fa' ? item?.faName : item?.enName}
                    </SelectItem>
                  )}
                </ListBox>
              </Autocomplete>
            </Popover>
          </Select>
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

export default forwardRef(CustomAutocomplete);
