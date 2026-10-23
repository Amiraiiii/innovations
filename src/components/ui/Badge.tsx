'use client';

import React from 'react';

interface BadgeProps {
  variant?: 'new' | 'hit' | 'sale' | 'default';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'default', children }) => {
  const getBadgeStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'hit':
        return {
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          color: '#FF6B6B',
          border: '1px solid rgba(239, 68, 68, 0.4)',
        };
      case 'new':
        return {
          backgroundColor: 'rgba(169, 155, 255, 0.2)',
          color: 'var(--accent-light)',
          border: '1px solid var(--accent-primary)',
        };
      case 'sale':
        return {
          backgroundColor: 'rgba(245, 158, 11, 0.2)',
          color: '#FBBF24',
          border: '1px solid rgba(245, 158, 11, 0.4)',
        };
      default:
        return {
          backgroundColor: 'var(--bg-surface)',
          color: 'var(--text-secondary)',
          border: '1px solid var(--border-light)',
        };
    }
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 8px',
        borderRadius: 'var(--radius-sm)',
        fontSize: '11px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        ...getBadgeStyle(),
      }}
    >
      {children}
    </span>
  );
};
