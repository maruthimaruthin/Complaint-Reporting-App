import React from 'react';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

type StatusType = 'open' | 'in-progress' | 'resolved';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const getStyles = (status: StatusType) => {
    switch (status) {
      case 'open':
        return {
          bg: 'bg-status-open/10',
          text: 'text-status-open',
          border: 'border-status-open/30',
          icon: AlertCircle,
        };
      case 'in-progress':
        return {
          bg: 'bg-status-in-progress/10',
          text: 'text-status-in-progress',
          border: 'border-status-in-progress/30',
          icon: Clock,
        };
      case 'resolved':
        return {
          bg: 'bg-status-resolved/10',
          text: 'text-status-resolved',
          border: 'border-status-resolved/30',
          icon: CheckCircle2,
        };
    }
  };

  const styles = getStyles(status);
  const Icon = styles.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${styles.bg} ${styles.text} ${styles.border} text-sm font-medium ${className}`}>
      <Icon className="w-3.5 h-3.5" />
      <span className="capitalize">{status.replace('-', ' ')}</span>
    </div>
  );
}
