'use client';
import {
  Button,
  Key,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select as RASelect,
  SelectValue,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import Text from './text';

interface ISelect {
  options: { label: string; value: Key }[];
  value?: string;
  label?: string;
  description?: string;
  errorMessage?: string;
  block?: boolean;
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
  placeholder?: string;
  onSilverBg?: boolean;
  size?: 'normal' | 'small';
  isDisabled?: boolean;
  className?: string;
}

export default function Select(props: ISelect) {
  const {
    label,
    description,
    errorMessage,
    options,
    onChange,
    placeholder,
    value,
    onSilverBg,
    size = 'normal',
    isDisabled,
    className,
  } = props;

  return (
    <RASelect
      onSelectionChange={key => onChange?.(key as string)}
      placeholder={placeholder || ''}
      isDisabled={isDisabled}
      selectedKey={props.value}
    >
      {label && <Label>{label}</Label>}

      <Button
        className={twMerge(
          'flex justify-between items-center gap-2 transition-colors duration-200 rounded-2xl min-h-11 border w-full text-left px-5',
          size === 'small' && 'min-h-7 text-sm',
          onSilverBg
            ? 'bg-white border-transparent shadow-[22px_10px_23px_0px_rgba(0,0,0,0.25)] hover:border-primary'
            : 'bg-gray-100 border-gray-300 hover:border-primary',
          errorMessage &&
            'border-red-600 hover:border-red-600 focus-within:border-red-600',
          isDisabled &&
            'border-gray-300 text-neutral-400 hover:border-gray-300 focus-within:border-gray-300',
          className,
        )}
      >
        <Text>
          <SelectValue
            className='flex-1 truncate text-sm'
            defaultValue={value}
          />
        </Text>
      </Button>

      <Popover
        className={twMerge(
          'max-w-[350px] placement-bottom:mt-2 placement-top:mb-2 group rounded-[16px] shadow-[10px_10px_23px_5px_rgba(0,0,0,0.25)] bg-white *:outline-0',
          'w-[var(--trigger-width)]',
        )}
      >
        <ListBox className='p-1 max-h-60 overflow-y-auto'>
          {options.map(option => (
            <ListBoxItem
              key={option.value}
              id={option.value}
              className='cursor-pointer px-3 py-2 rounded-lg text-sm transition-colors focus:bg-primary/10 selected:bg-primary/20'
            >
              {option.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>

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
    </RASelect>
  );
}
