import ModalTemplate from './modalTemplate';
import Text from './text';

interface IConfirmModal {
  show: boolean;
  onConfirm: (confirm: boolean, data?: unknown) => void;
  message?: string;
}

export default function ConfirmModal({
  show,
  onConfirm,
  message,
}: IConfirmModal) {
  return (
    <ModalTemplate
      show={show}
      onClose={() => onConfirm(false)}
      title={'Warning'}
    >
      <div>
        <Text center variant='h4'>
          {message}
        </Text>
      </div>
    </ModalTemplate>
  );
}
