import { PriceCalculation } from '@/interfaces/freight';

interface PackageInfoProps {
  packageDetails: {
    width: number;
    height: number;
    length: number;
    description: string;
  };
  priceCalculation?: PriceCalculation | null;
}

const PackageInfo = ({ packageDetails, priceCalculation }: PackageInfoProps) => (
  <div className="bg-gray-50 p-4 rounded-md">
    <h4 className="font-medium text-gray-900 mb-3">Detalles de Tu Paquete</h4>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-3">
      <div>
        <p className="text-sm text-gray-500">Ancho</p>
        <p className="font-medium text-gray-900">{packageDetails.width} cm</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Alto</p>
        <p className="font-medium text-gray-900">{packageDetails.height} cm</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Largo</p>
        <p className="font-medium text-gray-900">{packageDetails.length} cm</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Volumen</p>
        <p className="font-medium text-gray-900">{priceCalculation?.volumeM3 || '0'} m³</p>
      </div>
    </div>
    <div>
      <p className="text-sm text-gray-500 mb-1">Descripción</p>
      <p className="text-gray-900">{packageDetails.description}</p>
    </div>
  </div>
);

export default PackageInfo;
