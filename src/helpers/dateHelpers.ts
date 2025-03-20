export function formatDate(date: Date | undefined): string {
    if (!date) return 'No due date';
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  }
  
  export function formatRelativeDate(date: Date | undefined): string {
    if (!date) return 'No due date';
    
    const now = new Date();
    const diffDays = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    
    if (diffDays > 0) {
      if (diffDays < 7) return `In ${diffDays} days`;
      if (diffDays < 30) return `In ${Math.floor(diffDays / 7)} weeks`;
      return formatDate(date);
    } else {
      const absDiffDays = Math.abs(diffDays);
      if (absDiffDays < 7) return `${absDiffDays} days ago`;
      if (absDiffDays < 30) return `${Math.floor(absDiffDays / 7)} weeks ago`;
      return formatDate(date);
    }
  }
  
  export function isOverdue(date: Date | undefined): boolean {
    if (!date) return false;
    return date < new Date();
  }
  
  export function getDueDateColor(date: Date | undefined): string {
    if (!date) return 'text-gray-500';
    
    const now = new Date();
    const diffDays = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'text-red-600';
    if (diffDays === 0) return 'text-amber-500';
    if (diffDays <= 2) return 'text-amber-400';
    return 'text-green-600';
  }
  