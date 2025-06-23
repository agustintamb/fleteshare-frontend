import { Navigation, CheckCircle, Clock } from 'lucide-react';
import { IFreight } from '@/interfaces/freight';
import { IUser } from '@/interfaces/user';
import { formatDateTimeUTC } from '@/utils/time';

interface CustomerRouteProps {
  freight: IFreight;
  currentUser: IUser;
  isParticipant: boolean;
}

export const CustomerRoute = ({ freight, currentUser, isParticipant }: CustomerRouteProps) => {
  // No mostrar ruta si está cancelado
  if (freight.status === 'canceled' || !freight.suggestedRoute?.optimizedRoute) {
    return null;
  }

  const canJoin = !isParticipant;

  // Solo mostrar si es participante o puede unirse
  if (!isParticipant && !canJoin) return null;

  const optimizedRoute = freight.suggestedRoute.optimizedRoute;

  const getParticipantName = (participantIndex: number) => {
    const participant = freight.participants[participantIndex];
    if (!participant) return `Participante ${participantIndex + 1}`;
    if (participant.user._id === currentUser._id) return 'Tu dirección';
    return '';
  };

  const isCurrentUserStop = (participantIndex: number) => {
    const participant = freight.participants[participantIndex];
    return participant?.user._id === currentUser._id;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Navigation size={20} />
        Ruta del Flete
        {!isParticipant && (
          <span className="text-sm font-normal text-gray-500">(Vista previa)</span>
        )}
      </h2>

      {/* Mensaje informativo para usuarios que pueden unirse */}
      {!isParticipant && canJoin && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Vista previa:</strong> Esta es la ruta aproximada del flete. Si te unis, tu
            recorrido se integrará de forma optimizada.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {optimizedRoute.map((stop, index) => (
          <div key={stop._id || index} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  stop.visited
                    ? 'bg-green-500 text-white'
                    : index === 0 && freight.status === 'started'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {stop.visited ? <CheckCircle size={16} /> : index + 1}
              </div>
              {index < optimizedRoute.length - 1 && (
                <div
                  className={`w-0.5 h-6 mt-1 ${stop.visited ? 'bg-green-300' : 'bg-gray-200'}`}
                />
              )}
            </div>
            <div className="flex-1 pb-6">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    stop.type === 'pickup'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {stop.type === 'pickup' ? 'Retiro' : 'Entrega'}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {getParticipantName(stop.participantIndex)}
                </span>
                {stop.visited && (
                  <span className="text-xs text-green-600 font-medium">Visitado</span>
                )}
              </div>

              {/* Mostrar información de dirección según el contexto */}
              {isParticipant ? (
                // Si es participante: dirección completa si es suya, zona si es de otro
                isCurrentUserStop(stop.participantIndex) ? (
                  <p className="text-sm font-medium text-gray-900">
                    {stop.address.formattedAddress ||
                      `${stop.address.street} ${stop.address.number}, ${stop.address.city}`}
                  </p>
                ) : (
                  <p className="text-sm text-gray-400">
                    {stop.address.city}, {stop.address.state}
                  </p>
                )
              ) : (
                // Si puede unirse: solo mostrar zonas generales para todos
                <p className="text-sm text-gray-400">
                  {stop.address.city}, {stop.address.state}
                </p>
              )}

              {stop.estimatedArrivalTime && (
                <div className="flex items-center gap-1 mt-1">
                  <Clock size={12} className="text-gray-400" />
                  <span className="text-xs text-gray-500">
                    {formatDateTimeUTC(stop.estimatedArrivalTime)}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
