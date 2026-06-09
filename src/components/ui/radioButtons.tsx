'use client';
import { Key } from 'react-aria';
import { RadioGroup, Radio, Label } from 'react-aria-components';
import Text from './text';
import { twMerge } from 'tailwind-merge';

interface ICheckboxGroup {
  onChange?: (key: Key) => void;
  options?: Option[];
  value?: string;
  errorMessage?: string;
  label?: string;
  disabled?: boolean;
  itemsClassName?: string;
}

type Option = {
  name: string;
  id: string;
};

export default function RadioButtons(props: ICheckboxGroup) {
  const { onChange, options = [], label, itemsClassName } = props;

  return (
    <RadioGroup
      value={props.value}
      onChange={props.onChange}
      isDisabled={props.disabled}
    >
      <Label className='font-semibold'>{label}</Label>
      <div className={twMerge('flex gap-6', itemsClassName)}>
        {options.map(option => (
          <Radio
            key={option.id}
            onClick={() => !props.disabled && onChange?.(option.id)}
            value={option.id}
            isDisabled={props.disabled}
          >
            {({ isSelected, isDisabled }) => (
              <div
                className={twMerge(
                  'flex w-full items-center justify-between gap-[6px]',
                  !props.disabled && 'cursor-pointer',
                )}
              >
                <div className='flex items-center shrink-0 text-blue-400 group-selected:text-white'>
                  {isSelected ? (
                    <div className='w-[20px] h-[20px] rounded-full border-gray-500 border-2 flex items-center justify-center'>
                      <div className='w-[14px] h-[14px] rounded-full bg-primaryLight' />
                    </div>
                  ) : (
                    <div className='w-[20px] h-[20px] rounded-full border-gray-300 border-2' />
                  )}
                </div>
                <div className='flex flex-1 flex-col'>
                  <Text gray={isDisabled}>{option.name}</Text>
                </div>
              </div>
            )}
          </Radio>
        ))}
      </div>
      {!!props?.errorMessage && (
        <Text variant='caption' slot='description'>
          {props.errorMessage}
        </Text>
      )}
    </RadioGroup>
  );
}
