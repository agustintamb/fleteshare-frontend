import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  variant?: 'default' | 'outline' | 'filled';
  allowOverflow?: boolean;
}

const Card = ({
  children,
  className = '',
  onClick,
  hoverable = false,
  variant = 'default',
  allowOverflow = false,
}: CardProps) => {
  const baseStyles = 'rounded-lg';

  const overflowStyles = allowOverflow ? '' : 'overflow-hidden';

  const variantStyles = {
    default: 'bg-white shadow-md',
    outline: 'bg-white border border-gray-200',
    filled: 'bg-gray-50',
  };

  const hoverStyles = hoverable
    ? 'transition-transform transform hover:scale-[1.02] hover:shadow-lg cursor-pointer'
    : '';

  return (
    <div
      className={`${baseStyles} ${overflowStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
