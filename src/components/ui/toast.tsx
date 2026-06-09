'use client';
import { ReactNode } from 'react';
import {
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastContent as ToastContent,
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastRegion as ToastRegion,
} from 'react-aria-components';
import { flushSync } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import Icon from './Icon';
import Text from './text';

export interface MyToastContent {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  description?: string;
  timeout?: number; //default 5000
  icon?: string;
}

export const toast = new ToastQueue<MyToastContent>({
  wrapUpdate(fn) {
    if ('startViewTransition' in document) {
      document.startViewTransition(() => {
        flushSync(fn);
      });
    } else {
      fn();
    }
  },
});

export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {/* OTHER APP */}
      {children}

      <ToastRegion
        queue={toast}
        className={'fixed top-5 right-1 md:right-5 z-9999'}
      >
        {({ toast }) => {
          return (
            <Toast
              style={{
                viewTransitionName: toast.key,
                paddingBottom: '7px',
              }}
              toast={toast}
            >
              <ToastContent
                className={twMerge(
                  'py-4 px-10 rounded-2xl rounded-tr-none ',
                  'bg-primaryBrighter text-primaryDark font-semibold',
                  toast.content.icon && 'pr-5',
                  toast.content.variant === 'error' &&
                    'bg-error text-white font-semibold',
                  toast.content.variant === 'success' &&
                    'bg-green-600 text-white font-semibold',
                  toast.content.variant === 'warning' &&
                    'bg-yellow-600 text-yellow-100 font-semibold',
                  toast.content.variant === 'info' &&
                    'bg-blue-600 text-white font-semibold',
                )}
              >
                <div className='flex items-center justify-between gap-2'>
                  <div className='flex flex-col gap-1 text-right'>
                    <Text className='text-inherit' slot='title'>
                      {toast.content.title}
                    </Text>
                    <Text
                      className='text-inherit !font-normal'
                      slot='description'
                      variant='body2'
                    >
                      {toast.content.description}
                    </Text>
                  </div>

                  {toast.content.icon && (
                    <div className='rounded-full p-2 bg-white '>
                      <Icon icon={toast.content.icon} />
                    </div>
                  )}
                </div>
              </ToastContent>
            </Toast>
          );
        }}
      </ToastRegion>
    </>
  );
}
