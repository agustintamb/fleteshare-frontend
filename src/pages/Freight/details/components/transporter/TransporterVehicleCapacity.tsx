import { Truck } from 'lucide-react';
import { IFreight } from '@/interfaces/freight';

interface TransporterVehicleCapacityProps {
  freight: IFreight;
}

export const TransporterVehicleCapacity = ({ freight }: TransporterVehicleCapacityProps) => {
  if (freight.status === 'canceled') return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Truck size={20} />
        Capacidad del Vehículo
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Volumen requerido</span>
          <span className="font-medium">{freight.usedVolumeM3} m³</span>
        </div>
        {freight.assignedVehicle ? (
          <>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Capacidad total</span>
              <span className="font-medium">
                {freight.assignedVehicle.dimensions.totalVolumeM3} m³
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Disponible</span>
              <span className="font-medium text-blue-600">
                {(freight.assignedVehicle.dimensions.totalVolumeM3 - freight.usedVolumeM3).toFixed(
                  1
                )}{' '}
                m³
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Espacio utilizado</span>
              <span className="font-medium">
                {Math.round(
                  (freight.usedVolumeM3 / freight.assignedVehicle.dimensions.totalVolumeM3) * 100
                )}
                %
              </span>
            </div>

            {/* Barra de progreso */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{
                  width: `${Math.min(
                    (freight.usedVolumeM3 / freight.assignedVehicle.dimensions.totalVolumeM3) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Patente</span>
                <span className="font-medium">{freight.assignedVehicle.plate}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-600">Dimensiones de tu vehiculo</span>
                <span className="font-medium text-xs">
                  {freight.assignedVehicle.dimensions.length} ×{' '}
                  {freight.assignedVehicle.dimensions.width} ×{' '}
                  {freight.assignedVehicle.dimensions.height} cm
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500">No hay vehículo asignado todavía</p>
          </div>
        )}
      </div>
    </div>
  );
};
