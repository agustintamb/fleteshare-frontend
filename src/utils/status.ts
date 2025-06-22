import { FreightStatus } from '@/interfaces/freight';
import { UserDocumentationsStatus } from '@/interfaces/user';

export const statusOptions: { value: FreightStatus | 'all'; label: string; color: string }[] = [
  { value: 'all', label: 'Todos', color: 'text-gray-600' },
  { value: 'requested', label: 'Solicitado', color: 'text-blue-600' },
  { value: 'taken', label: 'Tomado', color: 'text-yellow-600' },
  { value: 'started', label: 'Iniciado', color: 'text-green-600' },
  { value: 'finished', label: 'Finalizado', color: 'text-gray-600' },
  { value: 'canceled', label: 'Cancelado', color: 'text-red-600' },
];

export const statusConfig: Record<
  FreightStatus,
  { label: string; color: string; bgColor: string }
> = {
  requested: { label: 'Solicitado', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  taken: { label: 'Tomado', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  started: { label: 'Iniciado', color: 'text-green-700', bgColor: 'bg-green-100' },
  finished: { label: 'Finalizado', color: 'text-gray-700', bgColor: 'bg-gray-100' },
  canceled: { label: 'Cancelado', color: 'text-red-700', bgColor: 'bg-red-100' },
};

export const getDocumentationStatusStyles = (status: UserDocumentationsStatus) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getDocumentationStatusText = (status: UserDocumentationsStatus) => {
  switch (status) {
    case 'pending':
      return 'Pendiente de validación';
    case 'approved':
      return 'Aprobada';
    case 'rejected':
      return 'Rechazada';
    default:
      return 'Sin estado';
  }
};
