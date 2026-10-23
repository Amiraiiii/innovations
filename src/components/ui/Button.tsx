'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: 'var(--radius-md)',
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all var(--transition-fast)',
    width: fullWidth ? '100%' : 'auto',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '8px 14px', fontSize: '13px' },
    md: { padding: '10px 20px', fontSize: '14px' },
    lg: { padding: '14px 28px', fontSize: '16px' },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: 'linear-gradient(135deg, rgba(167, 155, 242, 0.28) 0%, rgba(122, 90, 248, 0.42) 100%)',
      color: '#FFFFFF',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid rgba(216, 208, 255, 0.65)',
      boxShadow: '0 0 16px rgba(167, 155, 242, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
      textShadow: '0 0 10px rgba(196, 181, 253, 0.5)',
      letterSpacing: '0.3px',
    },
    secondary: {
      backgroundColor: 'rgba(20, 16, 38, 0.85)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-medium)',
    },
    outline: {
      backgroundColor: 'rgba(167, 155, 242, 0.08)',
      color: 'var(--accent-glow)',
      border: '1px solid rgba(167, 155, 242, 0.4)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--text-secondary)',
      border: '1px solid transparent',
    },
  };

  return (
    <button
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
      }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
