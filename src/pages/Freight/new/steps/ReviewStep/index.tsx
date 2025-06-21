import { motion } from 'framer-motion';
import { FormStepProps } from '../../types';
import RouteInfo from './components/RouteInfo';
import PackageInfo from './components/PackageInfo';
import ScheduleInfo from './components/ScheduleInfo';
import PriceSummary from './components/PriceSummary';

type ReviewStepProps = Omit<FormStepProps, 'isValid' | 'onNext' | 'onPrev'>;

const ReviewStep = ({ formData, priceCalculation }: ReviewStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Revisión y Confirmación</h2>
      <div className="space-y-6">
        <RouteInfo pickup={formData.pickup} delivery={formData.delivery} />
        <PackageInfo packageDetails={formData.packageDetails} priceCalculation={priceCalculation} />
        <ScheduleInfo scheduledDate={formData.scheduledDate} />
        {priceCalculation && <PriceSummary priceCalculation={priceCalculation} />}
      </div>
    </motion.div>
  );
};

export default ReviewStep;
