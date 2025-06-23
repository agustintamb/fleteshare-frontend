import { motion } from 'framer-motion';
import { JoinFormStepProps } from '../types';
import FreightInfo from '../components/FreightInfo';
import PackageInfo from '../components/PackageInfo';
import RouteInfo from '../components/RouteInfo';
import PriceSummary from '../components/PriceSummary';

type ReviewStepProps = Omit<JoinFormStepProps, 'isValid' | 'onNext' | 'onPrev'>;

const ReviewStep = ({ formData, freight, priceCalculation }: ReviewStepProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <h3 className="text-lg font-semibold text-gray-900 mb-6">Revisión y Confirmación</h3>
    <div className="space-y-6">
      <FreightInfo freight={freight} />
      <RouteInfo pickup={formData.pickup} delivery={formData.delivery} />
      <PackageInfo packageDetails={formData.packageDetails} priceCalculation={priceCalculation} />
      {priceCalculation && <PriceSummary priceCalculation={priceCalculation} />}

      {/* Términos y condiciones */}
      <div className="bg-yellow-50 p-4 rounded-md">
        <p className="text-sm text-yellow-800">
          <strong>Al unirte a este flete aceptas:</strong>
        </p>
        <ul className="text-sm text-yellow-700 mt-2 space-y-1">
          <li>• Cumplir con las dimensiones declaradas del paquete</li>
          <li>• Comunicarte y coordinar horarios con el transportista</li>
          <li>• Pagar el precio acordado al momento de la entrega</li>
        </ul>
      </div>
    </div>
  </motion.div>
);

export default ReviewStep;
