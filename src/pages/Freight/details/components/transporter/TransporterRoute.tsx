import { Navigation, CheckCircle, Clock } from 'lucide-react';
import { IFreight } from '@/interfaces/freight';
import { formatDateTimeUTC } from '@/utils/time';
import { useAuth } from '@/hooks/useAuth';

interface TransporterRouteProps {
  freight: IFreight;
  onParticipantClick: (participantId: string) => void;
}

export const TransporterRoute = ({ freight, onParticipantClick }: TransporterRouteProps) => {
  const { currentUser } = useAuth();
  // No mostrar ruta si está cancelado o no hay ruta optimizada
  if (freight.status === 'canceled' || !freight.suggestedRoute?.optimizedRoute) return null;

  const optimizedRoute = freight.suggestedRoute.optimizedRoute;
  const isAssigned = freight.transporterId?._id === currentUser?._id;

  const getParticipantName = (participantIndex: number) => {
    const participant = freight.participants[participantIndex];
    if (!participant) return `Participante ${participantIndex + 1}`;
    return `${participant.user.firstName} ${participant.user.lastName}`;
  };

  const getParticipant = (participantIndex: number) => {
    return freight.participants[participantIndex];
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Navigation size={20} />
        Ruta del Flete
        <span className="text-sm font-normal text-gray-500">({optimizedRoute.length} paradas)</span>
      </h2>
      <div className="space-y-3">
        {optimizedRoute.map((stop, index) => {
          const participant = getParticipant(stop.participantIndex);

          return (
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
                  <button
                    onClick={() => participant && onParticipantClick(participant.user._id)}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline"
                  >
                    {getParticipantName(stop.participantIndex)}
                  </button>
                  {stop.visited && (
                    <span className="text-xs text-green-600 font-medium">Visitado</span>
                  )}
                </div>

                <p className="text-sm font-medium text-gray-900">
                  {stop.address.formattedAddress ||
                    `${stop.address.street} ${stop.address.number}, ${stop.address.city}`}
                </p>

                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  {stop.estimatedArrivalTime && (
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="text-gray-400" />
                      <span>{formatDateTimeUTC(stop.estimatedArrivalTime)}</span>
                    </div>
                  )}
                  {stop.distanceFromPrevious && stop.distanceFromPrevious > 0 ? (
                    <span>{stop.distanceFromPrevious} km desde anterior</span>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumen de la ruta */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Total paradas</span>
            <p className="font-medium">{optimizedRoute.length}</p>
          </div>
          {isAssigned && (
            <>
              <div>
                <span className="text-gray-500">Completadas</span>
                <p
                  className={`font-medium ${
                    optimizedRoute.filter(stop => stop.visited).length > 0
                      ? 'text-green-600'
                      : 'text-gray-600'
                  }`}
                >
                  {optimizedRoute.filter(stop => stop.visited).length}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Pendientes</span>
                <p
                  className={`font-medium ${
                    optimizedRoute.filter(stop => !stop.visited).length > 0
                      ? 'text-red-600'
                      : 'text-gray-600'
                  }`}
                >
                  {optimizedRoute.filter(stop => !stop.visited).length}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Progreso</span>
                <p className="font-medium">
                  {Math.round(
                    (optimizedRoute.filter(stop => stop.visited).length / optimizedRoute.length) *
                      100
                  )}
                  %
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
