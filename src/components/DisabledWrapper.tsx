import { useAuth } from '@/hooks/useAuth';

interface DisabledWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const DisabledWrapper = ({ children, className = '' }: DisabledWrapperProps) => {
  const { isProfileCompleted, isProfileValidated } = useAuth();
  const isDisabled = !isProfileCompleted || !isProfileValidated;

  if (!isDisabled) return children;

  return (
    <div className={`relative ${className}`}>
      {/* Overlay que bloquea la interacción */}
      <div className="absolute inset-0 bg-gray-50 bg-opacity-75 z-10 cursor-not-allowed rounded-lg" />

      {/* Contenido grisado */}
      <div className="opacity-50 pointer-events-none">{children}</div>
    </div>
  );
};
