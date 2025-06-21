export const getTimeAgo = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Hace unos segundos';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `Hace ${minutes}m`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `Hace ${hours}h`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `Hace ${days}d`;
  } else {
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
    });
  }
};

/**
 * Formatea una fecha para mostrar en zona horaria local
 */
export const formatDateLocal = (date: Date | string): string => {
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
};

/**
 * Formatea una fecha y hora para mostrar en zona horaria local
 */
export const formatDateTimeLocal = (date: Date | string): string => {
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

/**
 * Formatea una fecha para mostrar solo la fecha (sin hora) sin conversión de zona horaria
 * Útil para mostrar fechas que se guardan en UTC pero deben mostrarse como fecha local
 */
export const formatDateUTC = (date: Date | string): string => {
  const dateObj = new Date(date);
  // Extraer año, mes y día directamente de la fecha UTC para evitar conversión de zona horaria
  const year = dateObj.getUTCFullYear();
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getUTCDate()).padStart(2, '0');

  return `${day}/${month}/${year}`;
};
