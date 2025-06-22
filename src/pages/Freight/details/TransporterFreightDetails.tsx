/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Truck,
  Users,
  DollarSign,
  Route,
  CheckCircle,
  Navigation,
  Phone,
  Mail,
  UserCircle,
} from 'lucide-react';
import { useFreightDetails } from './useFreightDetail';
import { ROUTES } from '@/utils/constants';
import { formatDateWithWeekday, formatDateTimeUTC } from '@/utils/time';
import { statusConfig } from '@/utils/status';
import { formatARS } from '@/utils/currency';
import { IParticipant } from '@/interfaces/freight';
import { IUser } from '@/interfaces/user';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

interface TransporterFreightDetailsProps {
  currentUser: IUser;
}

export const TransporterFreightDetails = ({ currentUser }: TransporterFreightDetailsProps) => {
  const { currentFreight: freight, isLoading } = useFreightDetails();
  const [selectedParticipant, setSelectedParticipant] = useState<IParticipant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading || !freight)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Cargando...</div>
      </div>
    );

  const statusInfo = statusConfig[freight.status];

  const handleParticipantClick = (participant: IParticipant) => {
    setSelectedParticipant(participant);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedParticipant(null);
  };

  // Crear la ruta completa combinando pickups y deliveries
  const createFullRoute = () => {
    if (!freight.suggestedRoute) return [];

    const allPoints: any = [];

    // Agregar todos los puntos de retiro
    freight.suggestedRoute.pickupSequence.forEach((point, index) => {
      const participant = freight.participants[point.participantIndex];
      allPoints.push({
        ...point,
        type: 'pickup',
        sequenceNumber: index + 1,
        visited: point.visited || false,
        participant: participant,
        participantName: participant
          ? `${participant.user.firstName} ${participant.user.lastName}`
          : `Participante ${point.participantIndex + 1}`,
      });
    });

    // Agregar todos los puntos de entrega
    freight.suggestedRoute.deliverySequence.forEach((point, index) => {
      const participant = freight.participants[point.participantIndex];
      allPoints.push({
        ...point,
        type: 'delivery',
        sequenceNumber: freight.suggestedRoute.pickupSequence.length + index + 1,
        visited: point.visited || false,
        participant: participant,
        participantName: participant
          ? `${participant.user.firstName} ${participant.user.lastName}`
          : `Participante ${point.participantIndex + 1}`,
      });
    });

    return allPoints;
  };

  const fullRoute = createFullRoute();

  return (
    <div className="space-y-6 pb-16 md:pb-0">
      {/* Header con información principal */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <Link to={ROUTES.DASHBOARD} className="text-blue-100 hover:text-white">
            <ArrowLeft size={24} />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Gestión de Flete</h1>
            <div className="flex items-center gap-3 mt-2">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}
              >
                {statusInfo.label}
              </span>
              <span className="text-blue-100 text-sm">ID: {freight._id.slice(-8)}</span>
            </div>
          </div>
        </div>

        {/* Información clave del flete */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-blue-200" />
            <div>
              <p className="text-blue-100 text-sm">Programado para</p>
              <p className="font-medium">
                {formatDateWithWeekday(new Date(freight.scheduledDate))}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users size={20} className="text-blue-200" />
            <div>
              <p className="text-blue-100 text-sm">Participantes</p>
              <p className="font-medium">{freight.participants.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DollarSign size={20} className="text-blue-200" />
            <div>
              <p className="text-blue-100 text-sm">Valor total</p>
              <p className="font-medium">{formatARS(freight.totalPrice)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Route size={20} className="text-blue-200" />
            <div>
              <p className="text-blue-100 text-sm">Distancia total</p>
              <p className="font-medium">{freight.suggestedRoute?.totalDistance.toFixed(1)} km</p>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones principales */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Acciones</h2>
          <div className="flex flex-wrap gap-3">
            {/* Botón de tomar flete (para transportistas) */}
            {freight.status === 'requested' && !freight.transporterId && (
              <Button variant="primary" size="lg">
                Tomar flete
              </Button>
            )}

            {/* Botones para transportista asignado */}
            {freight.transporterId === currentUser._id && (
              <>
                {freight.status === 'taken' && (
                  <Button variant="primary" size="lg">
                    Iniciar flete
                  </Button>
                )}
                {freight.status === 'started' && (
                  <Button variant="primary" size="lg">
                    Marcar en curso
                  </Button>
                )}
                {freight.status === 'going' && (
                  <Button variant="success" size="lg">
                    Finalizar flete
                  </Button>
                )}
                {['taken', 'started'].includes(freight.status) && (
                  <Button variant="outline" size="lg">
                    Cancelar flete
                  </Button>
                )}
              </>
            )}

            {/* Información si no hay acciones disponibles */}
            {freight.status === 'finished' && (
              <span className="text-sm text-gray-500 italic self-center">Flete completado</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Columna principal */}
        <div className="xl:col-span-2 space-y-6">
          {/* Ruta del flete */}
          {freight.suggestedRoute && fullRoute.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Navigation size={20} />
                Ruta del Flete
              </h2>
              <div className="space-y-3">
                {fullRoute.map((point: any, index: number) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          point.visited
                            ? 'bg-green-500 text-white'
                            : index === 0 && ['started', 'going'].includes(freight.status)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {point.visited ? <CheckCircle size={16} /> : point.sequenceNumber}
                      </div>
                      {index < fullRoute.length - 1 && (
                        <div
                          className={`w-0.5 h-6 mt-1 ${
                            point.visited ? 'bg-green-300' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            point.type === 'pickup'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {point.type === 'pickup' ? 'Retiro' : 'Entrega'}
                        </span>
                        <button
                          onClick={() =>
                            point.participant && handleParticipantClick(point.participant.user)
                          }
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline"
                        >
                          {point.participantName}
                        </button>
                        {point.visited && (
                          <span className="text-xs text-green-600 font-medium">Visitado</span>
                        )}
                      </div>

                      <p className="text-sm font-medium text-gray-900">
                        {point.address.formattedAddress ||
                          `${point.address.street} ${point.address.number}, ${point.address.city}`}
                      </p>

                      {point.estimatedTime && (
                        <div className="flex items-center gap-1 mt-1">
                          <Clock size={12} className="text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {formatDateTimeUTC(point.estimatedTime)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Todos los participantes con información completa */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users size={20} />
              Participantes del Flete
              <span className="text-sm font-normal text-gray-500">
                ({freight.participants.length})
              </span>
            </h2>
            <div className="space-y-4">
              {freight.participants.map((participant, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <button
                      onClick={() => handleParticipantClick(participant.user)}
                      className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
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
                    </button>
                  </div>

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
                          {participant.packageDimensions.volumeM3?.toFixed(2)} m³
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
              ))}
            </div>
          </div>
        </div>

        {/* Columna lateral */}
        <div className="space-y-6">
          {/* Resumen financiero */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign size={20} />
              Resumen Financiero
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Ingreso total</span>
                <span className="font-semibold text-green-600 text-lg">
                  {formatARS(freight.totalPrice)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Por participante</span>
                <span className="font-medium">
                  {formatARS(Math.round(freight.totalPrice / freight.participants.length))} promedio
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Distancia total</span>
                <span className="font-medium">
                  {freight.suggestedRoute?.totalDistance.toFixed(1)} km
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Por kilómetro</span>
                <span className="font-medium">
                  {freight.suggestedRoute
                    ? formatARS(
                        Math.round(freight.totalPrice / freight.suggestedRoute.totalDistance)
                      )
                    : '$ 0'}
                  /km
                </span>
              </div>
            </div>
          </div>

          {/* Información del vehículo y capacidad */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Truck size={20} />
              Capacidad del Vehículo
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Requerida</span>
                <span className="font-medium">{freight.usedVolumeM3.toFixed(2)} m³</span>
              </div>
              {freight.assignedVehicle && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Capacidad total</span>
                    <span className="font-medium">
                      {freight.assignedVehicle.dimensions.totalVolumeM3.toFixed(2)} m³
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Disponible</span>
                    <span className="font-medium text-blue-600">
                      {(
                        freight.assignedVehicle.dimensions.totalVolumeM3 - freight.usedVolumeM3
                      ).toFixed(2)}{' '}
                      m³
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Uso</span>
                    <span className="font-medium">
                      {Math.round(
                        (freight.usedVolumeM3 / freight.assignedVehicle.dimensions.totalVolumeM3) *
                          100
                      )}
                      %
                    </span>
                  </div>
                  {/* Barra de progreso */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          (freight.usedVolumeM3 /
                            freight.assignedVehicle.dimensions.totalVolumeM3) *
                            100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Patente</span>
                      <span className="font-medium">{freight.assignedVehicle.plate}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Información adicional */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Timeline del Flete</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Creado</span>
                <span>{formatDateTimeUTC(freight.createdAt)}</span>
              </div>
              {freight.startedAt && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Iniciado</span>
                  <span>{formatDateTimeUTC(freight.startedAt)}</span>
                </div>
              )}
              {freight.completedAt && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Completado</span>
                  <span>{formatDateTimeUTC(freight.completedAt)}</span>
                </div>
              )}
              {freight.cancelledAt && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Cancelado</span>
                  <span>{formatDateTimeUTC(freight.cancelledAt)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de información del participante */}
      <Modal open={isModalOpen} onClose={closeModal} title="Información del usuario" size="md">
        {selectedParticipant && (
          <div className="space-y-6">
            {/* Header del participante */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                {selectedParticipant.avatar ? (
                  <img
                    src={selectedParticipant.avatar}
                    alt={`${selectedParticipant.firstName} ${selectedParticipant.lastName}`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <UserCircle size={32} className="text-blue-600" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedParticipant.firstName} {selectedParticipant.lastName}
                </h3>
              </div>
            </div>

            {/* Información de contacto */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Información de Contacto</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedParticipant.username}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Teléfono</p>
                    <p className="font-medium">{selectedParticipant.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
