import { CheckCircle, Package } from 'lucide-react';

interface FreightSuccessMessageProps {
  type: 'completed-stops' | 'finished';
  isCustomer?: boolean;
}

export const FreightSuccessMessage = ({ type, isCustomer }: FreightSuccessMessageProps) => {
  const getMessageConfig = () => {
    switch (type) {
      case 'completed-stops':
        return {
          icon: <CheckCircle className="w-6 h-6 text-green-600" />,
          title: '¡Listo! Todas las paradas completadas',
          description:
            'El flete continuará "en camino" hasta que el transportista lo haya marcado como finalizado. Ya no necesitás realizar ninguna acción adicional.',
          supportText:
            'Si tienes dudas o consultas sobre tu envío, puedes contactar con nuestro soporte.',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          iconBgColor: 'bg-green-100',
          titleColor: 'text-green-900',
          descriptionColor: 'text-green-800',
          supportColor: 'text-green-700',
        };

      case 'finished':
        return {
          icon: <Package className="w-6 h-6 text-blue-600" />,
          title: '¡Flete finalizado exitosamente!',
          description: isCustomer
            ? 'El transportista ha completado todas las entregas y el flete ha pasado a finalizado.'
            : 'Has completado todas las entregas y el flete ha pasado a finalizado.',
          supportText:
            'Gracias por utilizar nuestro servicio. Si necesitas realizar un nuevo envío o tienes consultas, no dudes en contactarnos.',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          iconBgColor: 'bg-blue-100',
          titleColor: 'text-blue-900',
          descriptionColor: 'text-blue-800',
          supportColor: 'text-blue-700',
        };

      default:
        return null;
    }
  };

  const config = getMessageConfig();

  if (!config) return null;

  return (
    <div className={`${config.bgColor} border ${config.borderColor} rounded-lg shadow-md p-6`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div
            className={`w-10 h-10 ${config.iconBgColor} rounded-full flex items-center justify-center`}
          >
            {config.icon}
          </div>
        </div>
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${config.titleColor} mb-2`}>{config.title}</h3>
          <p className={`${config.descriptionColor} mb-3 leading-relaxed`}>{config.description}</p>
          <p className={`text-sm ${config.supportColor} italic`}>{config.supportText}</p>
        </div>
      </div>
    </div>
  );
};
