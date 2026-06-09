import { ReactNode } from 'react';
import { Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components';
import Text from './text';
import Icon from './Icon';
import { twMerge } from 'tailwind-merge';

interface IModal {
  show: boolean;
  onClose: (show: boolean) => void;
  title?: string;
  force?: boolean;
  children?: ReactNode | ReactNode[];
  className?: string;
  drawerMenu?: boolean;
}

export default function ModalTemplate({
  children,
  show,
  onClose,
  title,
  force,
  className,
  drawerMenu = false,
}: IModal) {
  if (!show) return null;
  return (
    <ModalOverlay
      data-modal-backdrop
      isOpen={show}
      aria-label={`modal-${title}`}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in duration-200'
      isDismissable
      isKeyboardDismissDisabled
      shouldCloseOnInteractOutside={element => {
        if ((element as HTMLElement).closest('[data-modal-backdrop]')) {
          onClose(false);
          return true;
        }
        return false;
      }}
    >
      <Modal
        isOpen={show}
        onOpenChange={() =>
          typeof force === 'undefined' || !force
            ? onClose(false)
            : () => undefined
        }
        aria-label={`modal-${title}`}
        className={twMerge(
          'absolute h-fit max-h-dvh min-h-32 scroll-bar overflow-y-auto max-w-screen-lg bg-white shadow-xl p-5 animate-in zoom-in-95 slide-in-from-bottom-10 duration-200',
          className,
          drawerMenu
            ? 'absolute bottom-0 left-0 top-0 h-screen w-90'
            : 'lg:relative lg:rounded-2xl lg:bottom-auto bottom-0 w-full',
        )}
      >
        {!force && (
          <div className='flex justify-end'>
            <Icon
              onClick={() => onClose(false)}
              icon='cross1'
              size={12}
              className='lg:mb-0 mb-1 text-slate-400 cursor-pointer'
            />
          </div>
        )}

        {title && (
          <Heading
            slot='title'
            className='pb-3 -mx-5 mb-8 text-center text-lg font-semibold border-b border-gray-300'
          >
            <Text>{title}</Text>
          </Heading>
        )}
        <Dialog className='text-gray-700 outline-0'>{children}</Dialog>
      </Modal>
    </ModalOverlay>
  );
}
