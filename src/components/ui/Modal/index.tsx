import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from './useModal';

interface IModalProps {
  open: boolean;
  onClose?: () => void;
  title?: string | React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showHeader?: boolean;
}

const Modal = ({
  open,
  onClose,
  title,
  children,
  actions,
  size = 'md',
  showHeader = true,
}: IModalProps) => {
  const { modalRef, getSizeClass } = useModal({ open, onClose, size });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-black bg-opacity-60 backdrop-blur-sm"
        >
          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`relative w-full ${getSizeClass()} max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl`}
          >
            {/* Header */}
            {showHeader && (title || onClose) && (
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                {title && (
                  <h2 className="text-xl font-semibold text-gray-900">
                    {typeof title === 'string' ? title : title}
                  </h2>
                )}
                {onClose && (
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-auto"
                    aria-label="Cerrar modal"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className={showHeader ? 'p-6' : 'p-6'}>{children}</div>

            {/* Actions */}
            {actions && <div className="flex justify-end gap-2 p-6 pt-0">{actions}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
