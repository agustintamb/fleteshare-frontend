import { IFreight } from '@/interfaces/freight';
import { useAuth } from '@/hooks/useAuth';
import { CustomerFreightCard } from './CustomerFreightCard';
import { TransporterFreightCard } from './TransporterFreightCard';

interface FreightCardProps {
  freight: IFreight;
  isOwner?: boolean;
  showJoinButton?: boolean;
  showCompact?: boolean;
  showPriorityBadge?: boolean;
}

export const FreightCard = (props: FreightCardProps) => {
  const { isTransporter, isCustomer } = useAuth();
  if (isTransporter) return <TransporterFreightCard {...props} />;
  if (isCustomer) return <CustomerFreightCard {...props} />;
  return <CustomerFreightCard {...props} />;
};
