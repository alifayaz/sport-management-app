'use client';

import { ReactNode } from 'react';
import { Dialog, Modal, ModalOverlay } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

//==== TYPES ====//
interface IDrawer {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Drawer({ onClose, children, show }: IDrawer) {
  return (
    <ModalOverlay
      isOpen={show}
      isDismissable
      className={({ defaultClassName }) =>
        twMerge(
          'fixed inset-0 z-50 bg-black/40 transition-opacity duration-300',
          'entering:animate-in entering:fade-in',
          'exiting:animate-out exiting:fade-out',
          defaultClassName,
        )
      }
    >
      <Modal
        isOpen={show}
        onOpenChange={isOpen => !isOpen && onClose()}
        className={twMerge('')}
      >
        <Dialog className='flex h-full flex-col outline-none'>
          <div className='flex-1 overflow-auto p-4'>{children}</div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
