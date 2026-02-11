'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationCardProps {
  title: string;
  message: string;
  type?: NotificationType;
  onClose?: () => void;
  duration?: number; // in milliseconds, 0 = no auto-close
}

export function NotificationCard({
  title,
  message,
  type = 'info',
  onClose,
  duration = 5000,
}: NotificationCardProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  const getStyles = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-status-resolved/10',
          border: 'border-status-resolved/30',
          text: 'text-status-resolved',
          icon: CheckCircle2,
        };
      case 'error':
        return {
          bg: 'bg-destructive/10',
          border: 'border-destructive/30',
          text: 'text-destructive',
          icon: AlertCircle,
        };
      case 'warning':
        return {
          bg: 'bg-status-open/10',
          border: 'border-status-open/30',
          text: 'text-status-open',
          icon: AlertCircle,
        };
      default:
        return {
          bg: 'bg-primary/10',
          border: 'border-primary/30',
          text: 'text-primary',
          icon: CheckCircle2,
        };
    }
  };

  const styles = getStyles(type);
  const Icon = styles.icon;

  return (
    <div className={`${styles.bg} border ${styles.border} rounded-lg p-4 flex gap-3 items-start`}>
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${styles.text}`} />
      <div className="flex-1 min-w-0">
        <h3 className={`font-semibold text-sm ${styles.text}`}>{title}</h3>
        <p className="text-sm text-foreground mt-1">{message}</p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        className={`flex-shrink-0 p-1 hover:bg-black/5 rounded transition-colors ${styles.text}`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
