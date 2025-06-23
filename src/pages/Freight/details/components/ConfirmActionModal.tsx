import { AlertTriangle } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { UserRole } from '@/interfaces/user';

export type FreightAction = 'take' | 'start' | 'finish' | 'cancel' | 'leave' | 'markAsVisited';

interface ConfirmActionModalProps {
  open: boolean;
  role: UserRole;
  action: FreightAction;
  isLoading?: boolean;
  freightId: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmActionModal = ({
  open,
  role,
  action,
  isLoading = false,
  freightId,
  onClose,
  onConfirm,
}: ConfirmActionModalProps) => {
  const getActionConfig = () => {
    switch (action) {
      case 'take':
        if (role === 'customer') return null;
        return {
          title: 'Tomar Flete',
          message: '¿Estás seguro que querés tomar este flete?',
          description:
            'Al tomar este flete, te asignarás como transportista y podrás comenzar a coordinar con los clientes.',
          confirmText: 'Sí, tomar flete',
          confirmVariant: 'primary' as const,
        };
      case 'start':
        if (role === 'customer') return null;
        return {
          title: 'Iniciar Flete',
          message: '¿Estás seguro que querés iniciar el flete?',
          description:
            'Al iniciar el flete, se notificará a los clientes y podrás comenzar el transporte.',
          confirmText: 'Sí, iniciar flete',
          confirmVariant: 'primary' as const,
        };
      case 'finish':
        if (role === 'customer') return null;
        return {
          title: 'Finalizar Flete',
          message: '¿Estás seguro que querés finalizar el flete?',
          description:
            'Al finalizar el flete, se marcará como completado y se cerrará el  proceso de transporte.',
          confirmText: 'Sí, finalizar flete',
          confirmVariant: 'primary' as const,
        };
      case 'cancel':
        if (role === 'transporter') {
          return {
            title: 'Cancelar Flete',
            message: '¿Estás seguro que querés cancelarlo?',
            description:
              'Esta acción no se puede deshacer. Todos los clientes serán notificados y perderás la asignación del flete.',
            confirmText: 'Sí, cancelar',
            confirmVariant: 'danger' as const,
          };
        } else {
          return {
            title: 'Cancelar Flete',
            message: '¿Estás seguro que querés cancelarlo?',
            description:
              'Esta acción no se puede deshacer. En tal caso, deberás crear una nueva solicitud de flete.',
            confirmText: 'Sí, cancelar',
            confirmVariant: 'danger' as const,
          };
        }
      case 'leave':
        if (role === 'transporter') {
          return {
            title: 'Bajarse del Flete',
            message: '¿Estás seguro que querés bajarte?',
            description:
              'Podrás volver a asignártelo mientras no lo haya tomado otro transportista.',
            confirmText: 'Sí, bajarme',
            confirmVariant: 'outline' as const,
          };
        } else {
          return {
            title: 'Bajarse del Flete',
            message: '¿Estás seguro que querés bajarte?',
            description: 'Podrás volver a unirte mientras el flete no haya comenzado.',
            confirmText: 'Sí, bajarme',
            confirmVariant: 'outline' as const,
          };
        }
      case 'markAsVisited':
        if (role === 'transporter') return null;
        return {
          title: 'Concretar Visita',
          message: 'Atención',
          description:
            'Esta acción significa que el transportista ha pasado por el punto de visita y ya podrá continuar con el recorrido.',
          confirmText: 'Sí, confirmar',
          confirmVariant: 'primary' as const,
        };
      default:
        return null;
    }
  };

  const config = getActionConfig();

  if (!config) return null;

  return (
    <Modal open={open} onClose={onClose} title={config.title} size="md">
      <div className="space-y-4">
        {/* Warning Icon */}
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
            <AlertTriangle size={24} className="text-yellow-600" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">{config.message}</h3>
          <p className="text-sm text-gray-600">{config.description}</p>
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">
              <strong>ID del flete:</strong> {freightId.slice(-8)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} disabled={isLoading} className="flex-1">
            Cancelar
          </Button>
          <Button
            variant={config.confirmVariant}
            onClick={onConfirm}
            disabled={isLoading}
            isLoading={isLoading}
            className="flex-1"
          >
            {config.confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
