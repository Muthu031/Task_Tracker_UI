import React from 'react';
import { TaskPriority } from '../../types';
import { getPriorityColor, getPriorityLabel } from '../../helpers/priorityParser';

interface PriorityBadgeProps {
  priority: TaskPriority;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  priority,
  showLabel = true,
  size = 'md'
}) => {
  const color = getPriorityColor(priority);
  const label = getPriorityLabel(priority);
  
  let sizeClasses;
  switch (size) {
    case 'sm':
      sizeClasses = 'h-2 w-2';
      break;
    case 'lg':
      sizeClasses = 'h-4 w-4';
      break;
    default:
      sizeClasses = 'h-3 w-3';
  }
  
  return (
    <div className="flex items-center">
      <span className={`inline-block ${sizeClasses} rounded-full ${color}`} />
      {showLabel && (
        <span className="ml-1.5 text-sm text-gray-700">{label}</span>
      )}
    </div>
  );
};

export default PriorityBadge;