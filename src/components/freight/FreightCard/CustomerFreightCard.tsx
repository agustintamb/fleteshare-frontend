import { useNavigate } from 'react-router-dom';
import { IFreight } from '@/interfaces/freight';
import { statusConfig } from '@/utils/status';
import { formatDateUTC, getStartOfDateUTC, getStartOfTodayUTC, getTimeAgo } from '@/utils/time';
import { MapPin, Package, Calendar, Users, Truck, ChevronRight, Clock, Star } from 'lucide-react';

interface CustomerFreightCardProps {
  freight: IFreight;
  isOwner?: boolean;
  showJoinButton?: boolean;
  showCompact?: boolean;
  showPriorityBadge?: boolean;
}

export const CustomerFreightCard = ({
  freight,
  isOwner = false,
  showJoinButton = false,
  showCompact = false,
  showPriorityBadge = false,
}: CustomerFreightCardProps) => {
  const navigate = useNavigate();

  const status = statusConfig[freight.status];

  // Get main pickup and delivery (from first participant)
  const mainParticipant = freight.participants[0];
  const pickupCity = mainParticipant?.pickupAddress.city;
  const deliveryCity = mainParticipant?.deliveryAddress.city;

  // Calculate volume usage percentage
  const volumeUsagePercentage = freight.assignedVehicle
    ? Math.round((freight.usedVolumeM3 / freight.assignedVehicle.dimensions.totalVolumeM3) * 100)
    : 0;

  // Check if freight is upcoming (within next 7 days)
  const today = getStartOfTodayUTC();
  const freightDate = getStartOfDateUTC(freight.scheduledDate);
  const daysUntil = Math.ceil((freightDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const isUpcoming = daysUntil >= 0 && daysUntil <= 7;

  // Get time ago from creation
  const timeAgoCreated = getTimeAgo(freight.createdAt.toString());

  // Show vehicle info only if status is 'taken' or higher (has assigned vehicle)
  const showVehicleInfo = freight.status !== 'requested' && freight.assignedVehicle;

  const handleCardClick = () => navigate(`/fletes/${freight._id}`);

  const handleJoinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/fletes/${freight._id}/unirse`);
  };

  // Compact view for dashboard
  if (showCompact) {
    return (
      <div
        className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="p-4">
          {/* Compact Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 rounded">
                <Truck className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-gray-900 text-sm">#{freight._id.slice(-8)}</h4>
                  <span className="text-xs text-gray-500">{timeAgoCreated}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.color} ${status.bgColor}`}
                  >
                    {status.label}
                  </span>
                  {showPriorityBadge && isUpcoming && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium text-orange-700 bg-orange-100 flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Próximo
                    </span>
                  )}
                </div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>

          {/* Compact Route */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <MapPin className="h-3 w-3 text-green-500" />
              <span className="font-medium">{pickupCity}</span>
            </div>
            <div className="flex-1 border-t border-dashed border-gray-300"></div>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <MapPin className="h-3 w-3 text-red-500" />
              <span className="font-medium">{deliveryCity}</span>
            </div>
          </div>

          {/* Compact Details */}
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center gap-3">
              <span>{formatDateUTC(freight.scheduledDate)}</span>
              <span>{freight.participants.length} part.</span>
            </div>
          </div>

          {/* Vehicle info for compact view */}
          {showVehicleInfo && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">
                  Vehículo: {freight.assignedVehicle!.plate}
                </span>
                <span className="text-xs text-gray-500">{volumeUsagePercentage}% ocupado</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full ${
                    volumeUsagePercentage >= 90
                      ? 'bg-red-500'
                      : volumeUsagePercentage >= 70
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                  style={{ width: `${volumeUsagePercentage}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Full view for freight requests page
  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Truck className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900">ID #{freight._id.slice(-8)}</h3>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  - {timeAgoCreated}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${status.color} ${status.bgColor}`}
                >
                  {status.label}
                </span>
                {isOwner && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium text-green-700 bg-green-100">
                    Propietario
                  </span>
                )}
                {showPriorityBadge && isUpcoming && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium text-orange-700 bg-orange-100 flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    Próximo ({daysUntil}d)
                  </span>
                )}
              </div>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>

        {/* Route */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-green-500" />
            <span className="font-medium">{pickupCity}</span>
          </div>
          <div className="flex-1 border-t border-dashed border-gray-300"></div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-red-500" />
            <span className="font-medium">{deliveryCity}</span>
          </div>
        </div>

        {/* Details Grid - Customer focused */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {/* Date */}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div>
              <div className="text-xs text-gray-500">Programado</div>
              <div className="text-sm font-medium text-gray-900">
                {formatDateUTC(freight.scheduledDate)}
              </div>
            </div>
          </div>

          {/* Participants */}
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-400" />
            <div>
              <div className="text-xs text-gray-500">Participantes</div>
              <div className="text-sm font-medium text-gray-900">{freight.participants.length}</div>
            </div>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-gray-400" />
            <div>
              <div className="text-xs text-gray-500">Volumen</div>
              <div className="text-sm font-medium text-gray-900">
                {freight.usedVolumeM3.toFixed(1)}m³
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Status - only shown when status is 'taken' or higher */}
        {showVehicleInfo && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Vehículo: {freight.assignedVehicle!.plate}
              </span>
              <span className="text-sm text-gray-600">{volumeUsagePercentage}% ocupado</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  volumeUsagePercentage >= 90
                    ? 'bg-red-500'
                    : volumeUsagePercentage >= 70
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${volumeUsagePercentage}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {freight.usedVolumeM3.toFixed(1)}m³ /{' '}
              {freight.assignedVehicle!.dimensions.totalVolumeM3.toFixed(1)}m³
            </div>
          </div>
        )}

        {/* Actions */}
        {showJoinButton && freight.status === 'requested' && freight.availableVolumeM3 > 0 && (
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-600">
              <Clock className="h-4 w-4 inline mr-1" />
              Espacio disponible: {freight.availableVolumeM3.toFixed(1)}m³
            </div>
            <button
              onClick={handleJoinClick}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Unirse al flete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
