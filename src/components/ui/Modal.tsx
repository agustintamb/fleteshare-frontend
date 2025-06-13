import React from 'react';

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: string | React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children, actions }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative animate-fade-in">
        {onClose && (
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ×
          </button>
        )}
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        <div className="mb-4">{children}</div>
        {actions && <div className="flex justify-end gap-2">{actions}</div>}
      </div>
    </div>
  );
};

export default Modal;
