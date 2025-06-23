import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { cleanPriceCalculation } from '@/features/freights/slice';
import { useFreightDetails } from './useFreightDetail';
import { IUser } from '@/interfaces/user';
import { JoinFreightModal } from './join/JoinFreightModal';
import { ConfirmActionModal, FreightAction } from './components/ConfirmActionModal';

// Componentes modulares
import { CustomerHeader } from './components/customer/CustomerHeader';
import { CustomerActions } from './components/customer/CustomerActions';
import { CustomerMyShipment } from './components/customer/CustomerMyShipment';
import { CustomerRoute } from './components/customer/CustomerRoute';
import { CustomerTransporterInfo } from './components/customer/CustomerTransporterInfo';
import { FreightStatusTimeline } from './components/FreightStatusTimeline';
import { FreightSuccessMessage } from './components/FreightSuccessMessage';

interface CustomerFreightDetailsProps {
  currentUser: IUser;
}

export const CustomerFreightDetails = ({ currentUser }: CustomerFreightDetailsProps) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    currentFreight: freight,
    isLoading,
    isActionLoading,
    freightId,
    handleCancelFreight,
    handleLeaveFreight,
    handleMarkAsVisited,
    refetch,
  } = useFreightDetails();

  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    isOpen: boolean;
    action: FreightAction | null;
    participantIndex?: number;
    stopType?: 'pickup' | 'delivery';
  }>({ isOpen: false, action: null });

  if (!freight || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Cargando...</div>
      </div>
    );
  }

  // Estados del usuario
  const isParticipant = freight.participants.some(p => p.user._id === currentUser._id);
  const currentParticipant = freight.participants.find(p => p.user._id === currentUser._id);

  // Verificar si el usuario ya completó todas sus paradas
  const getUserCompletedStops = () => {
    if (freight.status !== 'started' || !isParticipant || !freight.suggestedRoute?.optimizedRoute) {
      return { hasCompletedAll: false, totalStops: 0, completedStops: 0 };
    }

    const currentUserParticipantIndex = freight.participants.findIndex(
      p => p.user._id === currentUser._id
    );

    if (currentUserParticipantIndex === -1)
      return { hasCompletedAll: false, totalStops: 0, completedStops: 0 };

    const userStops = freight.suggestedRoute.optimizedRoute.filter(
      stop => stop.participantIndex === currentUserParticipantIndex
    );

    const completedUserStops = userStops.filter(stop => stop.visited);

    return {
      hasCompletedAll: userStops.length > 0 && completedUserStops.length === userStops.length,
      totalStops: userStops.length,
      completedStops: completedUserStops.length,
    };
  };

  const userStopsStatus = getUserCompletedStops();

  const handleOnCloseJoin = () => {
    setIsJoinModalOpen(false);
    dispatch(cleanPriceCalculation());
  };

  const handleConfirmAction = async () => {
    if (confirmAction.action === 'cancel') handleCancelFreight();
    if (confirmAction.action === 'leave') handleLeaveFreight();
    if (
      confirmAction.action === 'markAsVisited' &&
      confirmAction.participantIndex !== undefined &&
      confirmAction.stopType
    ) {
      handleMarkAsVisited(confirmAction.participantIndex, confirmAction.stopType);
    }
    setConfirmAction({ isOpen: false, action: null });
  };

  const openConfirmModal = (
    action: FreightAction,
    participantIndex?: number,
    stopType?: 'pickup' | 'delivery'
  ) => setConfirmAction({ isOpen: true, action, participantIndex, stopType });

  const closeConfirmModal = () => setConfirmAction({ isOpen: false, action: null });

  const handleJoinFreight = () => setIsJoinModalOpen(true);
  const handleCancelFreightAction = () => openConfirmModal('cancel');
  const handleLeaveFreightAction = () => openConfirmModal('leave');
  const handleMarkAsVisitedAction = (participantIndex: number, stopType: 'pickup' | 'delivery') =>
    openConfirmModal('markAsVisited', participantIndex, stopType);

  // Si está cancelado, mostrar solo header y estado
  if (freight.status === 'canceled') {
    return (
      <div className="space-y-6 pb-16 md:pb-0">
        <CustomerHeader freight={freight} />
        <FreightStatusTimeline freight={freight} />
      </div>
    );
  }

  // Si está finalizado, mostrar mensaje de éxito
  if (freight.status === 'finished') {
    return (
      <div className="space-y-6 pb-16 md:pb-0">
        <CustomerHeader freight={freight} />
        <FreightSuccessMessage type="finished" isCustomer />
        <FreightStatusTimeline freight={freight} />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16 md:pb-0">
      {/* Header */}
      <CustomerHeader freight={freight} />

      {/* Acciones o mensaje de finalización */}
      {freight.status === 'started' && isParticipant && userStopsStatus.hasCompletedAll ? (
        <FreightSuccessMessage type="completed-stops" />
      ) : (
        <CustomerActions
          freight={freight}
          currentUser={currentUser}
          isActionLoading={isActionLoading}
          onJoinFreight={handleJoinFreight}
          onCancelFreight={handleCancelFreightAction}
          onLeaveFreight={handleLeaveFreightAction}
          onMarkAsVisited={handleMarkAsVisitedAction}
        />
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Columna principal */}
        <div className="xl:col-span-2 space-y-6">
          <CustomerRoute
            freight={freight}
            currentUser={currentUser}
            isParticipant={isParticipant}
          />
          {isParticipant && currentParticipant && (
            <CustomerMyShipment participant={currentParticipant} />
          )}
        </div>

        {/* Columna lateral */}
        <div className="space-y-6">
          {/* Transportista */}
          <CustomerTransporterInfo freight={freight} />
          {/* Estado del flete */}
          <FreightStatusTimeline freight={freight} />
        </div>
      </div>

      {/* Modales */}
      <JoinFreightModal
        open={isJoinModalOpen}
        freight={freight}
        onClose={handleOnCloseJoin}
        refetch={refetch}
      />
      <ConfirmActionModal
        role={currentUser.role}
        open={confirmAction.isOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirmAction}
        action={confirmAction.action!}
        isLoading={isActionLoading}
        freightId={freightId!}
      />
    </div>
  );
};
