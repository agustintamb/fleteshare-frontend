import { Phone, Truck, User, UserCircle } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { IAssignedVehicle, ITransporterData } from '@/interfaces/freight';

interface TransporterInfoModalProps {
  transporter?: ITransporterData | null;
  isOpen: boolean;
  onClose: () => void;
  assignedVehicle?: IAssignedVehicle;
}

export const TransporterInfoModal = ({
  transporter,
  isOpen,
  onClose,
}: TransporterInfoModalProps) => {
  if (!transporter) return null;
  return (
    <Modal open={isOpen} onClose={onClose} title="Información del Transportista" size="md">
      <div className="space-y-3">
        {/* Header del transportista */}
        <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <UserCircle size={32} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {transporter.firstName} {transporter.lastName}
            </h3>
            <p className="text-sm text-blue-600">Transportista</p>
          </div>
        </div>

        {/* Información de contacto */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Información de Contacto</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone size={16} className="text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Teléfono</p>
                <p className="font-medium">{transporter.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <User size={16} className="text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">ID del Transportista</p>
                <p className="font-medium text-xs text-gray-500">{transporter._id}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Información del vehículo */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900 flex items-center gap-2">
            <Truck size={16} />
            Información del Vehículo
          </h4>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Patente</span>
              <span className="font-medium">{transporter.vehicle.plate}</span>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-700">
            Contactá al transportista para coordinar horarios de retiro y entrega, o cualquier
            consulta sobre tu envío.
          </p>
        </div>
      </div>
    </Modal>
  );
};
