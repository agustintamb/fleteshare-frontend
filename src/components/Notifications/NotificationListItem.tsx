import { motion } from 'framer-motion';
import { INotification } from '@/interfaces/notifications';
import NotificationIcon from './NotificationIcon';

interface NotificationListItemProps {
  notification: INotification;
  isSelected: boolean;
  isMobile: boolean;
  onSelect: (notification: INotification) => void;
  getTimeAgo: (date: string) => string;
}

const NotificationListItem = ({
  notification,
  isSelected,
  isMobile,
  onSelect,
  getTimeAgo,
}: NotificationListItemProps) => (
  <motion.div
    onClick={() => onSelect(notification)}
    key={notification._id}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className={`${
      isMobile ? 'p-4' : 'p-4'
    } cursor-pointer transition-all duration-200 hover:bg-gray-50
       ${!notification.readed ? 'bg-gradient-to-r from-blue-50/40 to-purple-50/20' : ''}
       ${isSelected && !isMobile ? 'bg-primary-50' : ''}`}
  >
    <div className="flex items-start gap-3">
      <div
        className={`mt-1 p-2 rounded-full ${
          notification.type === 'info'
            ? 'bg-blue-100'
            : notification.type === 'warning'
            ? 'bg-yellow-100'
            : notification.type === 'success'
            ? 'bg-green-100'
            : notification.type === 'error'
            ? 'bg-red-100'
            : 'bg-blue-100'
        }`}
      >
        <NotificationIcon type={notification.type} size={isMobile ? 16 : 14} />
      </div>

      <div className="flex-1 min-w-0">
        <h3
          className={`${isMobile ? 'text-base' : 'text-sm'} ${
            !notification.readed ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'
          } line-clamp-1`}
        >
          {notification.subject}
        </h3>
        <p className={`${isMobile ? 'text-sm' : 'text-xs'} text-gray-600 mt-1 line-clamp-2`}>
          {notification.body}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className={`${isMobile ? 'text-sm' : 'text-xs'} text-gray-400`}>
            {getTimeAgo(notification.createdAt)}
          </span>
          {!notification.readed && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
        </div>
      </div>

      {isMobile && (
        <div className="flex items-center">
          <div className="w-2 h-4 text-gray-300">
            <svg viewBox="0 0 8 16" fill="currentColor">
              <path d="M2 4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>
      )}
    </div>
  </motion.div>
);

export default NotificationListItem;
