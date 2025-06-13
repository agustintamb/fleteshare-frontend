import { useEffect } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';

interface UseModalProps {
  open: boolean;
  onClose?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const useModal = ({ open, onClose, size = 'md' }: UseModalProps) => {
  // Outside click detection
  const modalRef = useOutsideClick<HTMLDivElement>(() => {
    if (onClose) onClose();
  });

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'max-w-sm';
      case 'md':
        return 'max-w-md';
      case 'lg':
        return 'max-w-2xl';
      case 'xl':
        return 'max-w-4xl';
      case 'full':
        return 'max-w-7xl';
      default:
        return 'max-w-md';
    }
  };
  // Close modal on escape key
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return {
    modalRef,
    getSizeClass,
  };
};
