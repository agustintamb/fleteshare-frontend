import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Package,
  Calendar,
  Clock,
  User,
  Truck,
  Users,
  Route,
  CheckCircle,
  Navigation,
  Phone,
} from 'lucide-react';
import { useFreightDetails } from './useFreightDetail';
import { IUser } from '@/interfaces/user';
import { formatDateWithWeekday, formatDateTimeUTC } from '@/utils/time';
import { statusConfig } from '@/utils/status';
import { ROUTES } from '@/utils/constants';
import Button from '@/components/ui/Button';

interface CustomerFreightDetailsProps {
  currentUser: IUser;
}

export const CustomerFreightDetails = ({ currentUser }: CustomerFreightDetailsProps) => {
  const { currentFreight: freight, isLoading } = useFreightDetails();

  if (!freight || isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Cargando...</div>
      </div>
    );

  // Verificar si el usuario actual es participante
  const isParticipant = freight.participants.some(p => p.user._id === currentUser._id);
  const isCreator = freight.createdBy === currentUser._id;
  const isOnlyParticipant = freight.participants.length === 1 && isParticipant;
  const canJoin = !isParticipant;

  // Obtener la información del participante actual (si es participante)
  const currentParticipant = freight.participants.find(p => p.user._id === currentUser._id);

  // Estados que permiten cancelar/bajarse
  const canCancelOrLeave = ['requested', 'taken'].includes(freight.status);

  const statusInfo = statusConfig[freight.status];

  // Crear la ruta completa combinando pickups y deliveries
  interface RoutePoint {
    type: 'pickup' | 'delivery';
    sequenceNumber: number;
    visited: boolean;
    participantName: string;
    isCurrentUser: boolean;
    participantIndex: number;
    estimatedTime?: string | Date;
    address: {
      formattedAddress?: string;
      street?: string;
      number?: string | number;
      city?: string;
      state?: string;
    };
  }

  const createFullRoute = (): RoutePoint[] => {
    if (!freight.suggestedRoute) return [];

    const allPoints: RoutePoint[] = [];

    // Agregar todos los puntos de retiro
    freight.suggestedRoute.pickupSequence.forEach((point, index) => {
      const participant = freight.participants[point.participantIndex];
      allPoints.push({
        ...point,
        type: 'pickup',
        sequenceNumber: index + 1,
        visited: point.visited || false,
        participantName: participant
          ? `${participant.user.firstName} ${participant.user.lastName}`
          : `Participante ${point.participantIndex + 1}`,
        isCurrentUser: participant?.user._id === currentUser._id,
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
        participantName: participant
          ? `${participant.user.firstName} ${participant.user.lastName}`
          : `Participante ${point.participantIndex + 1}`,
        isCurrentUser: participant?.user._id === currentUser._id,
      });
    });

    return allPoints;
  };

  const fullRoute = createFullRoute();

  return (
    <div className="space-y-6 pb-16 md:pb-0">
      {/* Header con información principal */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <Link to={ROUTES.DASHBOARD} className="text-blue-100 hover:text-white">
            <ArrowLeft size={24} />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Detalle del Flete</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            {/* Botón de unirse (para customers que no son participantes) */}
            {canJoin && (
              <Button variant="primary" size="lg">
                Unirse al flete
              </Button>
            )}

            {/* Botón de cancelar (para creadores o únicos participantes) */}
            {canCancelOrLeave && (isCreator || isOnlyParticipant) && (
              <Button variant="danger" size="lg">
                Cancelar flete
              </Button>
            )}

            {/* Botón de bajarse (para participantes que no son únicos) */}
            {canCancelOrLeave && isParticipant && !isOnlyParticipant && (
              <Button variant="outline" size="lg">
                Bajarme del flete
              </Button>
            )}

            {/* Información si no hay acciones disponibles */}
            {!canJoin && !canCancelOrLeave && (
              <span className="text-sm text-gray-500 italic self-center">
                No hay acciones disponibles en el estado actual
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Columna principal */}
        <div className="xl:col-span-2 space-y-6">
          {/* Mi envío (solo para participantes) */}
          {isParticipant && currentParticipant && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                <Package size={20} />
                Tu Envío
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Direcciones */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-green-700 mb-2">
                      <MapPin size={16} />
                      <span className="font-medium">Retiro</span>
                      {/* Mensaje informativo para usuarios que pueden unirse */}
                      {!isParticipant && (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm text-blue-700">
                            <strong>Vista previa:</strong> Esta es la ruta aproximada del flete. Una
                            vez que te unas, podrás ver los detalles completos de tu recorrido.
                          </p>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-900 font-medium">
                      {currentParticipant.pickupAddress.formattedAddress ||
                        `${currentParticipant.pickupAddress.street} ${currentParticipant.pickupAddress.number}, ${currentParticipant.pickupAddress.city}`}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm text-green-700 mb-2">
                      <MapPin size={16} />
                      <span className="font-medium">Entrega</span>
                    </div>
                    <p className="text-sm text-gray-900 font-medium">
                      {currentParticipant.deliveryAddress.formattedAddress ||
                        `${currentParticipant.deliveryAddress.street} ${currentParticipant.deliveryAddress.number}, ${currentParticipant.deliveryAddress.city}`}
                    </p>
                  </div>
                </div>

                {/* Detalles */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-green-600 font-medium">Tu Precio</span>
                    <p className="text-xl font-bold text-green-900">
                      ${currentParticipant.price.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-green-600 font-medium">Distancia</span>
                    <p className="text-lg font-semibold text-green-900">
                      {currentParticipant.distance.toFixed(1)} km
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-green-600 font-medium">Dimensiones</span>
                    <p className="text-sm font-medium text-green-900">
                      {currentParticipant.packageDimensions.length} ×{' '}
                      {currentParticipant.packageDimensions.width} ×{' '}
                      {currentParticipant.packageDimensions.height} cm
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-green-600 font-medium">Volumen</span>
                    <p className="text-sm font-medium text-green-900">
                      {currentParticipant.packageDimensions.volumeM3} m³
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Ruta del flete - Para participantes y usuarios que pueden unirse */}
          {freight.suggestedRoute && fullRoute.length > 0 && (isParticipant || canJoin) && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Navigation size={20} />
                Ruta del Flete
                {!isParticipant && (
                  <span className="text-sm font-normal text-gray-500">(Vista previa)</span>
                )}
              </h2>
              <div className="space-y-3">
                {fullRoute.map((point, index) => (
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
                        <span className="text-xs text-gray-700 font-medium">
                          {point.isCurrentUser ? '' : point.participantName}
                        </span>
                        {point.visited && (
                          <span className="text-xs text-green-600 font-medium">Visitado</span>
                        )}
                      </div>

                      {/* Si es el usuario actual, mostrar dirección completa, sino solo zona */}
                      {point.isCurrentUser ? (
                        <p className="text-sm font-medium text-gray-900">
                          {point.address.formattedAddress ||
                            `${point.address.street} ${point.address.number}, ${point.address.city}`}
                        </p>
                      ) : (
                        <p className="text-sm font-medium text-gray-600">
                          {point.address.city}, {point.address.state}
                        </p>
                      )}

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

          {/* Otros participantes (vista limitada para customers) */}
          {freight.participants.length > 1 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users size={20} />
                Otros Participantes
                <span className="text-sm font-normal text-gray-500">
                  ({freight.participants.length - (isParticipant ? 1 : 0)})
                </span>
              </h2>
              <div className="space-y-4">
                {freight.participants.map((participant, index) => {
                  const isCurrentUser = participant.user._id === currentUser._id;

                  // Si es el usuario actual y ya lo mostramos arriba, no lo mostramos aquí
                  if (isCurrentUser && isParticipant) return null;

                  return (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <User size={16} className="text-gray-400" />
                        <span className="font-medium">
                          {participant.user.firstName} {participant.user.lastName}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Zona de retiro</div>
                            <p className="text-sm font-medium">
                              {participant.pickupAddress.city}, {participant.pickupAddress.state}
                            </p>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Zona de entrega</div>
                            <p className="text-sm font-medium">
                              {participant.deliveryAddress.city}
                            </p>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-gray-100">
                          <span className="text-xs text-gray-500">
                            Se unió {formatDateTimeUTC(participant.joinedAt).split(' ')[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Columna lateral */}
        <div className="space-y-6">
          {/* Transportista */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Truck size={20} />
              Transportista
            </h2>
            {freight.transporterId ? (
              <div className="space-y-4">
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <User size={24} className="text-gray-400" />
                  </div>
                  <h3 className="font-medium text-gray-900">Transportista Asignado</h3>
                  <p className="text-sm text-gray-500">ID: {freight.transporterId}</p>
                </div>

                {/* Info del vehículo si está disponible */}
                {freight.assignedVehicle && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Vehículo</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Patente</span>
                        <span className="text-sm font-medium">{freight.assignedVehicle.plate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Capacidad</span>
                        <span className="text-sm font-medium">
                          {freight.assignedVehicle.dimensions.totalVolumeM3.toFixed(1)} m³
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <Button variant="outline" className="w-full">
                  <Phone size={16} className="mr-2" />
                  Contactar transportista
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <p className="text-sm text-gray-600">
                  Esperando que un transportista tome este flete
                </p>
              </div>
            )}
          </div>

          {/* Información adicional */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Estado del Flete</h3>
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
    </div>
  );
};
