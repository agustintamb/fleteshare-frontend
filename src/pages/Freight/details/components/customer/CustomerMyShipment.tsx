import { Package, MapPin, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { IFreightParticipant } from '@/interfaces/freight';

interface CustomerMyShipmentProps {
  participant: IFreightParticipant;
}

export const CustomerMyShipment = ({ participant }: CustomerMyShipmentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg">
      <button className="w-full p-6 text-left" onClick={() => setIsOpen(!isOpen)}>
        <h2 className="text-lg font-semibold text-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package size={20} />
            Información del Envío
          </div>
          <ChevronDown
            size={20}
            className={`transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          />
        </h2>
      </button>

      {isOpen && (
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Direcciones */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <MapPin size={16} />
                  <span className="font-medium">Retiro</span>
                </div>
                <p className="text-sm text-gray-900 font-medium">
                  {participant.pickupAddress.formattedAddress ||
                    `${participant.pickupAddress.street} ${participant.pickupAddress.number}, ${participant.pickupAddress.city}`}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <MapPin size={16} />
                  <span className="font-medium">Entrega</span>
                </div>
                <p className="text-sm text-gray-900 font-medium">
                  {participant.deliveryAddress.formattedAddress ||
                    `${participant.deliveryAddress.street} ${participant.deliveryAddress.number}, ${participant.deliveryAddress.city}`}
                </p>
              </div>
            </div>

            {/* Detalles */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-gray-500 font-medium">Precio</span>
                <p className="text-xl font-bold text-gray-800">
                  ${participant.price.toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-500 font-medium">Distancia</span>
                <p className="text-lg font-semibold text-gray-800">
                  {participant.distance.toFixed(1)} km
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-500 font-medium">Dimensiones</span>
                <p className="text-sm font-medium text-gray-800">
                  {participant.packageDimensions.length} × {participant.packageDimensions.width} ×{' '}
                  {participant.packageDimensions.height} cm
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-500 font-medium">Volumen</span>
                <p className="text-sm font-medium text-gray-800">
                  {participant.packageDimensions.volumeM3} m³
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
