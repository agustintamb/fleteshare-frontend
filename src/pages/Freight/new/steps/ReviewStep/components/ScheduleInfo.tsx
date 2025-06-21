interface ScheduleInfoProps {
  scheduledDate: string;
}

const ScheduleInfo = ({ scheduledDate }: ScheduleInfoProps) => {
  const date = new Date(`${scheduledDate}T12:00:00`);
  const formattedDate = date.toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h3 className="font-medium text-gray-900 mb-2">Fecha Programada</h3>
      <p className="text-gray-700">{formattedDate}</p>
    </div>
  );
};

export default ScheduleInfo;
