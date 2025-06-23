import { useState } from 'react';
import { useFreightDetails } from './useFreightDetail';
import { IUser } from '@/interfaces/user';
import { IParticipant } from '@/interfaces/freight';
import { ConfirmActionModal, FreightAction } from './components/ConfirmActionModal';

// Componentes modulares
import { TransporterHeader } from './components/transporter/TransporterHeader';
import { TransporterActions } from './components/transporter/TransporterActions';
import { TransporterRoute } from './components/transporter/TransporterRoute';
import { TransporterParticipants } from './components/transporter/TransporterParticipants';
import { TransporterFinancialSummary } from './components/transporter/TransporterFinancialSummary';
import { TransporterVehicleCapacity } from './components/transporter/TransporterVehicleCapacity';
import { FreightStatusTimeline } from './components/FreightStatusTimeline';
import { ParticipantInfoModal } from './components/ParticipantInfoModal';

interface TransporterFreightDetailsProps {
  currentUser: IUser;
}

export const TransporterFreightDetails = ({ currentUser }: TransporterFreightDetailsProps) => {
  const {
    currentFreight: freight,
    isLoading,
    isActionLoading,
    freightId,
    handleCancelFreight,
    handleTakeFreight,
    handleStartFreight,
    handleFinishFreight,
    handleLeaveFreight,
  } = useFreightDetails();

  const [selectedParticipant, setSelectedParticipant] = useState<IParticipant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    isOpen: boolean;
    action: FreightAction | null;
  }>({ isOpen: false, action: null });

  if (isLoading || !freight) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Cargando...</div>
      </div>
    );
  }

  // Handlers para acciones
  const handleParticipantClick = (participantId: string) => {
    const participant = freight.participants.find(p => p.user._id === participantId);
    if (participant) {
      setSelectedParticipant(participant.user);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedParticipant(null);
  };

  const openConfirmModal = (action: FreightAction) => setConfirmAction({ isOpen: true, action });
  const closeConfirmModal = () => setConfirmAction({ isOpen: false, action: null });

  const handleConfirmAction = async () => {
    if (confirmAction.action === 'cancel') handleCancelFreight();
    if (confirmAction.action === 'leave') handleLeaveFreight();
    if (confirmAction.action === 'take') handleTakeFreight();
    if (confirmAction.action === 'start') handleStartFreight();
    if (confirmAction.action === 'finish') handleFinishFreight();
    setConfirmAction({ isOpen: false, action: null });
  };

  // Handlers para las acciones
  const handleTakeFreightAction = () => openConfirmModal('take');
  const handleCancelFreightAction = () => openConfirmModal('cancel');
  const handleLeaveFreightAction = () => openConfirmModal('leave');
  const handleStartFreightAction = () => openConfirmModal('start');
  const handleFinishFreightAction = () => openConfirmModal('finish');

  // Si está cancelado, mostrar solo header y estado
  if (freight.status === 'canceled')
    return (
      <div className="space-y-6 pb-16 md:pb-0">
        <TransporterHeader freight={freight} />
        <FreightStatusTimeline freight={freight} />
      </div>
    );

  return (
    <div className="space-y-6 pb-16 md:pb-0">
      {/* Header */}
      <TransporterHeader freight={freight} />

      {/* Acciones */}
      <TransporterActions
        freight={freight}
        currentUser={currentUser}
        isActionLoading={isActionLoading}
        onTakeFreight={handleTakeFreightAction}
        onCancelFreight={handleCancelFreightAction}
        onLeaveFreight={handleLeaveFreightAction}
        onFinishFreight={handleFinishFreightAction}
        onStartFreight={handleStartFreightAction}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Columna principal */}
        <div className="xl:col-span-2 space-y-6">
          {/* Ruta del flete */}
          <TransporterRoute freight={freight} onParticipantClick={handleParticipantClick} />

          {/* Participantes */}
          <TransporterParticipants freight={freight} onParticipantClick={handleParticipantClick} />
        </div>

        {/* Columna lateral */}
        <div className="space-y-6">
          {/* Resumen financiero */}
          <TransporterFinancialSummary freight={freight} />

          {/* Capacidad del vehículo */}
          <TransporterVehicleCapacity freight={freight} />

          {/* Estado del flete */}
          <FreightStatusTimeline freight={freight} />
        </div>
      </div>

      {/* Modales */}
      <ParticipantInfoModal
        participant={selectedParticipant}
        isOpen={isModalOpen}
        onClose={closeModal}
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
