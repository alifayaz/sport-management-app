import React, { ReactNode } from 'react';
import { CheckboxProps, Checkbox as RACheckbox } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

//==== TYPES ====//
interface ICheckbox extends CheckboxProps {
  label?: string | null | ReactNode;
  className?: string;
}

export default function Checkbox({ label, className, ...props }: ICheckbox) {
  return (
    <RACheckbox
      {...props}
      className={twMerge(
        'flex items-center cursor-pointer select-none gap-2',
        className,
      )}
    >
      {/* Checkbox box */}
      {({ isSelected }) => (
        <>
          <div
            className={twMerge(
              'w-5 h-5 flex items-center justify-center border-2 rounded-md border-gray-300 transition-all duration-300',
              isSelected && 'bg-primary border-primary',
            )}
          >
            {/* Check mark */}
            <svg
              viewBox='0 0 18 18'
              className={twMerge(
                'w-4 h-4 stroke-white stroke-2 transition-all duration-300 scale-0',
                isSelected && 'scale-100',
              )}
              aria-hidden='true'
              fill='none'
            >
              <polyline points='1 9 7 14 15 4' />
            </svg>
          </div>

          {/* Label */}
          {label && <span className='text-gray-800 select-none'>{label}</span>}
        </>
      )}
    </RACheckbox>
  );
}
