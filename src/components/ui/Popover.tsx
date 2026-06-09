import { ReactNode } from 'react';
import {
  Dialog,
  Popover as MyPopover,
  OverlayArrow,
  PopoverProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

export function Popover(props: PopoverProps) {
  return (
    <MyPopover
      {...props}
      className={({ isEntering, isExiting }) =>
        twMerge(
          'max-w-[350px] placement-bottom:mt-2 placement-top:mb-2 group rounded-[16px] shadow-[10px_10px_23px_5px_rgba(0,0,0,0.25)] bg-white *:outline-0',
          isEntering &&
            'animate-in fade-in placement-bottom:slide-in-from-top-1 placement-top:slide-in-from-bottom-1 ease-out duration-200',
          isExiting &&
            'animate-out fade-out placement-bottom:slide-out-to-top-1 placement-top:slide-out-to-bottom-1 ease-in duration-150',
          props.className?.toString(),
        )
      }
    >
      <OverlayArrow>
        <svg
          viewBox='0 0 12 12'
          className='block fill-white group-placement-bottom:rotate-180 w-4 h-4'
        >
          <path d='M0 0L6 6L12 0' />
        </svg>
      </OverlayArrow>
      <Dialog aria-label={'popover-dialog'}>
        {props.children as ReactNode}
      </Dialog>
    </MyPopover>
  );
}
