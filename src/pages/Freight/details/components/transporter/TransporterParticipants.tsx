import { Users, User, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { IFreight } from '@/interfaces/freight';
import { formatDateTimeUTC } from '@/utils/time';
import { formatARS } from '@/utils/currency';

interface TransporterParticipantsProps {
  freight: IFreight;
  onParticipantClick: (participantId: string) => void;
}

export const TransporterParticipants = ({
  freight,
  onParticipantClick,
}: TransporterParticipantsProps) => {
  const [expandedParticipants, setExpandedParticipants] = useState<Set<string>>(new Set());

  if (freight.status === 'canceled') return null;

  const toggleParticipant = (participantId: string) => {
    const newExpanded = new Set(expandedParticipants);
    if (newExpanded.has(participantId)) {
      newExpanded.delete(participantId);
    } else newExpanded.add(participantId);
    setExpandedParticipants(newExpanded);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Users size={20} />
        Participantes del Flete
        <span className="text-sm font-normal text-gray-500">({freight.participants.length})</span>
      </h2>
      <div className="space-y-2">
        {freight.participants.map(participant => {
          const isExpanded = expandedParticipants.has(participant.user._id);

          return (
            <div key={participant.user._id} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleParticipant(participant.user._id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    {participant.user.avatar ? (
                      <img
                        src={participant.user.avatar}
                        alt={`${participant.user.firstName} ${participant.user.lastName}`}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User size={16} className="text-blue-600" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">
                      {participant.user.firstName} {participant.user.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{participant.user.username}</p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp size={20} className="text-gray-400" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <button
                    onClick={() => onParticipantClick(participant.user._id)}
                    className="text-xs text-blue-600 hover:text-blue-800 mb-3 underline"
                  >
                    Ver datos de contacto
                  </button>

                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Retiro</div>
                        <p className="text-sm font-medium">
                          {participant.pickupAddress.formattedAddress ||
                            `${participant.pickupAddress.street} ${participant.pickupAddress.number}, ${participant.pickupAddress.city}`}
                        </p>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Entrega</div>
                        <p className="text-sm font-medium">
                          {participant.deliveryAddress.formattedAddress ||
                            `${participant.deliveryAddress.street} ${participant.deliveryAddress.number}, ${participant.deliveryAddress.city}`}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 pt-3 border-t border-gray-100">
                      <div>
                        <span className="text-xs text-gray-500">Volumen</span>
                        <p className="text-sm font-medium">
                          {participant.packageDimensions.volumeM3} m³
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Distancia</span>
                        <p className="text-sm font-medium">{participant.distance.toFixed(1)} km</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Precio</span>
                        <p className="text-sm font-medium">{formatARS(participant.price)}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Se unió</span>
                        <p className="text-sm font-medium">
                          {formatDateTimeUTC(participant.joinedAt).split(' ')[0]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
