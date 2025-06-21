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
 * Formatea una fecha para mostrar el día de la semana completo, día, mes y año
 */
export const formatDateWithWeekday = (
  date: Date | string,
  display: 'short' | 'long' = 'long'
): string => {
  const dateObj = typeof date === 'string' ? new Date(`${date}T12:00:00`) : date;
  return dateObj.toLocaleDateString('es-AR', {
    weekday: display,
    day: 'numeric',
    month: display,
    year: 'numeric',
  });
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

/**
 * Formatea una fecha y hora sin conversión de zona horaria
 * Útil para mostrar fechas que se guardan en UTC pero deben mostrarse como fecha y hora local
 */
export const formatDateTimeUTC = (date: Date | string): string => {
  const dateObj = new Date(date);
  // Extraer año, mes, día, hora y minutos directamente de la fecha UTC
  const year = dateObj.getUTCFullYear();
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getUTCDate()).padStart(2, '0');
  const hours = String(dateObj.getUTCHours()).padStart(2, '0');
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
