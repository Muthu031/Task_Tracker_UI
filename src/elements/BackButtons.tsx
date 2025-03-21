import React, { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  route?: string;
  style?: CSSProperties;
  children?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ 
  route, 
  style,
  children = 'backward'
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (route) {
      navigate(route);
    } else {
      navigate(-1);
    }
  };

  return (
    <button 
      style={style}
      onClick={handleClick}
    >
      {children || '← Back'}
    </button>
  );
};

export default BackButton;