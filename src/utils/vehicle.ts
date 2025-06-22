import { IFreight } from '@/interfaces/freight';
import { ITransporterVehicle } from '@/interfaces/user';

/**
 * Calcula el volumen total de un vehículo en m³
 * @param length - Largo en cm
 * @param width - Ancho en cm
 * @param height - Alto en cm
 * @returns Volumen en m³
 */
export const calculateVehicleVolumeM3 = (length: number, width: number, height: number): number =>
  (length * width * height) / 1000000; // convertir de cm³ a m³

/**
 * Verifica si un transportista puede tomar un flete específico
 * @param freight - El flete a evaluar
 * @param transporterVehicle - El vehículo del transportista
 * @returns Objeto con información de capacidad
 */
export const canTransporterTakeFreight = (
  freight: IFreight,
  transporterVehicle: ITransporterVehicle
) => {
  const vehicleVolumeM3 = calculateVehicleVolumeM3(
    transporterVehicle.dimensions.length,
    transporterVehicle.dimensions.width,
    transporterVehicle.dimensions.height
  );

  const hasEnoughCapacity = freight.usedVolumeM3 <= vehicleVolumeM3;
  const capacityUsagePercentage = Math.round((freight.usedVolumeM3 / vehicleVolumeM3) * 100);

  return {
    canTake: hasEnoughCapacity,
    vehicleVolumeM3,
    capacityUsagePercentage,
    usedVolumeM3: freight.usedVolumeM3,
    availableVolumeM3: vehicleVolumeM3 - freight.usedVolumeM3,
    plate: transporterVehicle.plate,
  };
};

/**
 * Obtiene información de capacidad para mostrar en UI
 * @param freight - El flete
 * @param transporterVehicle - El vehículo del transportista
 * @returns Información formateada para mostrar
 */
export const getTransporterCapacityInfo = (
  freight: IFreight,
  transporterVehicle: ITransporterVehicle
) => {
  const capacityInfo = canTransporterTakeFreight(freight, transporterVehicle);

  return {
    ...capacityInfo,
    statusText: capacityInfo.canTake
      ? `${capacityInfo.capacityUsagePercentage}% si lo tomás`
      : 'No tenés capacidad suficiente',
    statusColor: capacityInfo.canTake ? 'text-green-600' : 'text-red-600',
    progressBarColor:
      capacityInfo.capacityUsagePercentage >= 90
        ? 'bg-red-500'
        : capacityInfo.capacityUsagePercentage >= 70
        ? 'bg-yellow-500'
        : 'bg-green-500',
    detailText: capacityInfo.canTake
      ? `${capacityInfo.usedVolumeM3}m³ / ${capacityInfo.vehicleVolumeM3}m³ disponibles`
      : `Necesitás ${capacityInfo.usedVolumeM3}m³ pero solo tenés ${capacityInfo.vehicleVolumeM3}m³`,
  };
};
