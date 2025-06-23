import Button from '@/components/ui/Button';
import { IFreight } from '@/interfaces/freight';
import { IUser } from '@/interfaces/user';

interface TransporterActionsProps {
  freight: IFreight;
  currentUser: IUser;
  isActionLoading: boolean;
  onTakeFreight: () => void;
  onCancelFreight: () => void;
  onLeaveFreight: () => void;
  onFinishFreight: () => void;
  onStartFreight?: () => void;
}

export const TransporterActions = ({
  freight,
  currentUser,
  isActionLoading,
  onTakeFreight,
  onCancelFreight,
  onLeaveFreight,
  onFinishFreight,
  onStartFreight,
}: TransporterActionsProps) => {
  // No mostrar acciones si está cancelado
  if (['canceled', 'finished'].includes(freight.status)) {
    if (freight.status === 'finished') {
      return (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Acciones</h2>
            <span className="text-sm text-gray-500 italic self-center">Flete completado</span>
          </div>
        </div>
      );
    }
    return null;
  }

  const isAssigned = freight.transporterId?._id === currentUser._id;

  const canCancelFreight =
    isAssigned &&
    freight.status === 'started' &&
    freight.suggestedRoute?.optimizedRoute?.some(stop => !stop.visited);

  const canFinishFreight =
    isAssigned &&
    freight.status === 'started' &&
    freight.suggestedRoute?.optimizedRoute?.every(stop => stop.visited);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-900">Acciones</h2>
        <div className="flex flex-wrap gap-3">
          {/* Botón de tomar flete (para transportistas no asignados) */}
          {freight.status === 'requested' && !freight.transporterId && (
            <Button
              variant="primary"
              size="lg"
              onClick={onTakeFreight}
              disabled={isActionLoading}
              isLoading={isActionLoading}
            >
              Tomar flete
            </Button>
          )}

          {/* Botones para transportista asignado */}
          {isAssigned && (
            <>
              {freight.status === 'taken' && (
                <>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={onStartFreight}
                    disabled={isActionLoading}
                  >
                    Iniciar flete
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={onLeaveFreight}
                    disabled={isActionLoading}
                  >
                    Bajarme del flete
                  </Button>
                </>
              )}

              {canCancelFreight && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={onCancelFreight}
                  disabled={isActionLoading}
                >
                  Cancelar flete
                </Button>
              )}
              {canFinishFreight && (
                <Button
                  variant="success"
                  size="lg"
                  onClick={onFinishFreight}
                  disabled={isActionLoading}
                >
                  Finalizar flete
                </Button>
              )}
            </>
          )}

          {/* Si ya está tomado por otro transportista */}
          {freight.transporterId && !isAssigned && freight.status !== 'requested' && (
            <span className="text-sm text-gray-500 italic self-center">
              Flete asignado a otro transportista
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
