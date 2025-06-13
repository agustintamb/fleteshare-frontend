import Modal from '@/components/ui/Modal';
import { useAuthModal } from './useAuthModal';

interface IAuthModalProps {
  type: 'login' | 'register' | 'recover';
  onClose: () => void;
}

const AuthModal = ({ type, onClose }: IAuthModalProps) => {
  const { getModalTitle, renderContent } = useAuthModal({ type });

  return (
    <Modal
      open={true}
      onClose={onClose}
      title={getModalTitle()}
      size={type === 'register' ? 'xl' : 'md'}
      showHeader={true}
    >
      {renderContent()}
    </Modal>
  );
};

export default AuthModal;
