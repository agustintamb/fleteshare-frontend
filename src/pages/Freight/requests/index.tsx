import { useAuth } from '@/hooks/useAuth';
import { ValidationBanner } from '@/components/ValidationBanner';
import { DisabledWrapper } from '@/components/DisabledWrapper';
import { CustomerFreightRequests } from './CustomerFreightRequests';
import { TransporterFreightRequests } from './TransporterFreightRequests';

const FreightRequests = () => {
  const { isCustomer, isTransporter } = useAuth();

  return (
    <div className="space-y-6 pb-16 md:pb-0">
      <ValidationBanner />
      <DisabledWrapper>
        {isCustomer && <CustomerFreightRequests />}
        {isTransporter && <TransporterFreightRequests />}
      </DisabledWrapper>
    </div>
  );
};

export default FreightRequests;
