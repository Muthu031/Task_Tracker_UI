import React, { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { nextButtonStyles } from '../styles/nextbutton';


interface NextButtonProps {
    route: string;
    style?: CSSProperties;
    variant?: keyof typeof nextButtonStyles ;
    children?: string;
    disabled?: boolean;
  }

const NextButton: React.FC<NextButtonProps> = ({ 
  route, 
  variant = 'disabled',
  disabled = false,
  children = 'forward'
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (!disabled) {
        navigate(route);
      }
  };
  const baseStyle = disabled ? nextButtonStyles.disabled : nextButtonStyles[variant];

  return (
    <button 
      style = {baseStyle}
      onClick={handleClick}
      disabled={disabled}
    >
      {children || 'Next →'}
     
    </button>
  );
};

export default NextButton;