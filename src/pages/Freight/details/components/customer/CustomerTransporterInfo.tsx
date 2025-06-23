import { useState } from 'react';
import { Truck, User, Clock, Eye } from 'lucide-react';
import { IFreight } from '@/interfaces/freight';
import Button from '@/components/ui/Button';
import { TransporterInfoModal } from '../TransporterInfoModal';

interface CustomerTransporterInfoProps {
  freight: IFreight;
}

export const CustomerTransporterInfo = ({ freight }: CustomerTransporterInfoProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // No mostrar si está cancelado
  if (freight.status === 'canceled') return null;

  // Determinar si transporterId es un objeto con datos o solo un string
  const hasTransporterData = freight.transporterId && typeof freight.transporterId === 'object';
  const transporterData = hasTransporterData ? freight.transporterId : null;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Truck size={20} />
          Transportista
        </h2>
        {transporterData ? (
          <div className="space-y-4">
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <User size={24} className="text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900">
                {transporterData.firstName} {transporterData.lastName}
              </h3>
              <p className="text-sm text-gray-500">Transportista Asignado</p>
            </div>

            {/* Info del vehículo */}
            {freight.assignedVehicle && (
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-2">Vehículo</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Patente</span>
                    <span className="text-sm font-medium">{freight.assignedVehicle.plate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Capacidad</span>
                    <span className="text-sm font-medium">
                      {freight.assignedVehicle.dimensions.totalVolumeM3.toFixed(1)} m³
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Botones de acción */}
            <div className="space-y-2">
              <Button variant="outline" className="w-full" onClick={openModal}>
                <Eye size={16} className="mr-2" />
                Ver información completa
              </Button>
            </div>
          </div>
        ) : freight.transporterId && typeof freight.transporterId === 'string' ? (
          // Fallback para cuando solo tenemos el ID como string
          <div className="space-y-4">
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                <User size={24} className="text-gray-400" />
              </div>
              <h3 className="font-medium text-gray-900">Transportista Asignado</h3>
              <p className="text-sm text-gray-500">ID: {freight.transporterId}</p>
            </div>

            {/* Info del vehículo si está disponible */}
            {freight.assignedVehicle && (
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-2">Vehículo</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Patente</span>
                    <span className="text-sm font-medium">{freight.assignedVehicle.plate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Capacidad</span>
                    <span className="text-sm font-medium">
                      {freight.assignedVehicle.dimensions.totalVolumeM3.toFixed(1)} m³
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Clock className="mx-auto h-12 w-12 text-gray-300 mb-3" />
            <p className="text-sm text-gray-600">Esperando que un transportista tome este flete</p>
          </div>
        )}
      </div>

      {/* Modal con información completa del transportista */}
      <TransporterInfoModal
        transporter={transporterData}
        assignedVehicle={freight.assignedVehicle}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};
