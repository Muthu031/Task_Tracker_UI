import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  icon,
  label,
  variant = 'primary',
  disabled = false
}) => {
  let buttonClasses = 'flex items-center px-3 py-2 rounded text-sm font-medium transition';
  
  switch (variant) {
    case 'primary':
      buttonClasses += ' bg-blue-600 hover:bg-blue-700 text-white';
      break;
    case 'secondary':
      buttonClasses += ' bg-gray-200 hover:bg-gray-300 text-gray-800';
      break;
    case 'danger':
      buttonClasses += ' bg-red-600 hover:bg-red-700 text-white';
      break;
  }
  
  if (disabled) {
    buttonClasses = buttonClasses.replace('hover:', '');
    buttonClasses += ' opacity-50 cursor-not-allowed';
  }
  
  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
    >
      <span className="mr-1">{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default ActionButton;