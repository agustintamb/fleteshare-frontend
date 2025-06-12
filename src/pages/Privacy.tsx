import Card from '@/components/ui/Card';

const Privacy = () => (
  <div className="max-w-2xl mx-auto py-14">
    <Card className="p-8">
      <h1 className="text-2xl font-bold mb-4">Política de Privacidad</h1>
      <p className="mb-4">En FleteShare nos comprometemos a proteger tu privacidad.</p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        <li>Solo usamos tus datos para mejorar la experiencia en la plataforma.</li>
        <li>No compartimos tu información con terceros sin tu consentimiento.</li>
        <li>Puedes solicitar la eliminación de tus datos en cualquier momento.</li>
        <li>Usamos cookies para mejorar la funcionalidad del sitio.</li>
        <li>Si tienes preguntas, contáctanos a través de nuestro formulario de soporte.</li>
        <li>Para más detalles, consulta nuestra sección de preguntas frecuentes.</li>
      </ul>
    </Card>
  </div>
);

export default Privacy;
