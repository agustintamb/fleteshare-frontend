import { Mail, Phone, UserCircle } from 'lucide-react';
import { IParticipant } from '@/interfaces/freight';
import Modal from '@/components/ui/Modal';

interface ParticipantInfoModalProps {
  participant: IParticipant | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ParticipantInfoModal = ({
  participant,
  isOpen,
  onClose,
}: ParticipantInfoModalProps) => {
  if (!participant) return null;
  return (
    <Modal open={isOpen} onClose={onClose} title="Información del usuario" size="md">
      <div className="space-y-6">
        {/* Header del participante */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            {participant.avatar ? (
              <img
                src={participant.avatar}
                alt={`${participant.firstName} ${participant.lastName}`}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <UserCircle size={32} className="text-blue-600" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {participant.firstName} {participant.lastName}
            </h3>
            <p className="text-sm text-gray-500">Cliente</p>
          </div>
        </div>

        {/* Información de contacto */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Información de Contacto</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail size={16} className="text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{participant.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone size={16} className="text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Teléfono</p>
                <p className="font-medium">{participant.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
