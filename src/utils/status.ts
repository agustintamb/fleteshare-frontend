import { UserDocumentationsStatus } from '@/interfaces/user';

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
