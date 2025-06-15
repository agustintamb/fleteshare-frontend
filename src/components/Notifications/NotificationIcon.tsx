import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { NotificationType } from '@/interfaces/notifications';

interface NotificationIconProps {
  type: NotificationType;
  size?: number;
}

const NotificationIcon = ({ type, size = 16 }: NotificationIconProps) => {
  const iconProps = { size, className: 'flex-shrink-0' };
  switch (type) {
    case 'info':
      return <Info {...iconProps} className="text-blue-500 flex-shrink-0" />;
    case 'warning':
      return <AlertTriangle {...iconProps} className="text-yellow-500 flex-shrink-0" />;
    case 'success':
      return <CheckCircle {...iconProps} className="text-green-500 flex-shrink-0" />;
    case 'error':
      return <XCircle {...iconProps} className="text-red-500 flex-shrink-0" />;
    default:
      return <Info {...iconProps} className="text-blue-500 flex-shrink-0" />;
  }
};

export default NotificationIcon;
