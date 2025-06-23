import Button from '@/components/ui/Button';
import { IFreight } from '@/interfaces/freight';
import { IUser } from '@/interfaces/user';
import { Info } from 'lucide-react';

interface CustomerActionsProps {
  freight: IFreight;
  currentUser: IUser;
  isActionLoading: boolean;
  onJoinFreight: () => void;
  onCancelFreight: () => void;
  onLeaveFreight: () => void;
  onMarkAsVisited: (participantIndex: number, stopType: 'pickup' | 'delivery') => void;
}

export const CustomerActions = ({
  freight,
  currentUser,
  isActionLoading,
  onJoinFreight,
  onCancelFreight,
  onLeaveFreight,
  onMarkAsVisited,
}: CustomerActionsProps) => {
  // No mostrar acciones si está cancelado o finalizado
  if (['canceled', 'finished'].includes(freight.status)) return null;

  const isParticipant = freight.participants.some(p => p.user._id === currentUser._id);
  const isCreator = freight.createdBy === currentUser._id;
  const isOnlyParticipant = freight.participants.length === 1 && isParticipant;
  const canJoin = !isParticipant;

  // Estados que permiten cancelar/bajarse
  const canCancelOrLeave = ['requested', 'taken'].includes(freight.status);

  // Lógica para determinar la próxima parada que debe ser visitada
  const getNextStopForCurrentUser = () => {
    if (freight.status !== 'started' || !isParticipant || !freight.suggestedRoute?.optimizedRoute) {
      return null;
    }

    // Encontrar el índice del usuario actual en la lista de participantes
    const currentUserParticipantIndex = freight.participants.findIndex(
      p => p.user._id === currentUser._id
    );

    if (currentUserParticipantIndex === -1) return null;

    // Encontrar la próxima parada no visitada en la ruta optimizada
    const nextUnvisitedStop = freight.suggestedRoute.optimizedRoute.find(stop => !stop.visited);

    // Verificar si la próxima parada no visitada corresponde al usuario actual
    if (nextUnvisitedStop && nextUnvisitedStop.participantIndex === currentUserParticipantIndex) {
      return nextUnvisitedStop;
    }

    return null;
  };

  // Función auxiliar para obtener información sobre el estado de espera
  const getWaitingInfo = () => {
    if (freight.status !== 'started' || !isParticipant || !freight.suggestedRoute?.optimizedRoute) {
      return null;
    }

    const nextUnvisitedStop = freight.suggestedRoute.optimizedRoute.find(stop => !stop.visited);
    if (!nextUnvisitedStop) return null;

    const nextParticipant = freight.participants[nextUnvisitedStop.participantIndex];
    if (!nextParticipant) return null;

    return {
      nextStop: nextUnvisitedStop,
      nextParticipant: nextParticipant,
    };
  };

  const nextStopForUser = getNextStopForCurrentUser();
  const canMarkVisited = nextStopForUser !== null;
  const waitingInfo = getWaitingInfo();

  // Determinar si hay acciones disponibles o mensajes que mostrar
  const hasActions = canJoin || canCancelOrLeave || canMarkVisited;
  const shouldShowWaitingMessage =
    freight.status === 'started' && isParticipant && !canMarkVisited && waitingInfo;

  if (!hasActions && !shouldShowWaitingMessage) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Acciones</h2>
          <span className="text-sm text-gray-500 italic self-center">
            No hay acciones disponibles en el estado actual
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-900">Acciones</h2>
        <div className="flex flex-wrap gap-3">
          {/* Botón de unirse (para customers que no son participantes) */}
          {canJoin && (
            <Button variant="primary" size="lg" onClick={onJoinFreight} disabled={isActionLoading}>
              Unirse al flete
            </Button>
          )}

          {/* Botón de cancelar (para creadores o únicos participantes) */}
          {canCancelOrLeave && isCreator && isOnlyParticipant && (
            <Button variant="danger" size="lg" onClick={onCancelFreight} disabled={isActionLoading}>
              Cancelar flete
            </Button>
          )}

          {/* Botón de bajarse (para participantes que no son únicos) */}
          {canCancelOrLeave && isParticipant && !isOnlyParticipant && (
            <Button variant="outline" size="lg" onClick={onLeaveFreight} disabled={isActionLoading}>
              Bajarme del flete
            </Button>
          )}

          {/* Acción para marcar la próxima parada como visitada - Solo para el usuario correspondiente */}
          {canMarkVisited && nextStopForUser && onMarkAsVisited && (
            <div className="relative group">
              <Button
                variant="success"
                size="lg"
                disabled={isActionLoading}
                isLoading={isActionLoading}
                onClick={() => {
                  const currentUserParticipantIndex = freight.participants.findIndex(
                    p => p.user._id === currentUser._id
                  );
                  onMarkAsVisited(currentUserParticipantIndex, nextStopForUser.type);
                }}
                className="flex items-center gap-2"
              >
                {nextStopForUser.type === 'pickup' ? 'Confirmar el retiro' : 'Confirmar la entrega'}
                <Info size={16} className="opacity-60" />
              </Button>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 w-64 text-center">
                {nextStopForUser.type === 'pickup'
                  ? 'Realizar esta acción solo si el transportista ha cargado tu paquete al vehículo y está listo para continuar con el recorrido'
                  : 'Confirmá la entrega solo si el transportista ha entregado tu paquete correctamente y han concretado el pago'}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          )}

          {/* Mensaje informativo cuando no es el turno del usuario */}
          {shouldShowWaitingMessage && waitingInfo && (
            <div className="p-4 bg-yellow-50 rounded-lg text-yellow-800">
              <p className="text-sm">
                Esperando a que el transportista complete otra entrega antes de continuar. Tu
                próxima parada será cuando el transportista complete esta entrega.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
