import { useAuth } from '@/hooks/useAuth';
import { CustomerFreightRequests } from './CustomerFreightRequests';
import { TransporterFreightRequests } from './TransporterFreightRequests';

const FreightRequests = () => {
  const { isCustomer, isTransporter } = useAuth();

  return (
    <div className="space-y-6 pb-16 md:pb-0">
      {isCustomer && <CustomerFreightRequests />}
      {isTransporter && <TransporterFreightRequests />}
    </div>
  );
};

export default FreightRequests;
