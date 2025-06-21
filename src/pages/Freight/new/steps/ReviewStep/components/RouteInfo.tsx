import { ArrowRight } from 'lucide-react';
import { IAddress } from '@/interfaces/address';

interface RouteInfoProps {
  pickup: IAddress;
  delivery: IAddress;
}

const RouteInfo = ({ pickup, delivery }: RouteInfoProps) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h3 className="font-medium text-gray-900 mb-3">Ruta del Flete</h3>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500 mb-1">Origen</p>
          <p className="text-gray-900">{pickup.formattedAddress}</p>
        </div>
        <div className="flex items-center">
          <div className="flex-1 border-t border-dashed border-gray-300"></div>
          <ArrowRight className="mx-2 text-gray-400" size={16} />
          <div className="flex-1 border-t border-dashed border-gray-300"></div>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Destino</p>
          <p className="text-gray-900">{delivery.formattedAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default RouteInfo;
