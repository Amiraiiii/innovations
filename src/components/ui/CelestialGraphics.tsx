'use client';

import React from 'react';

interface CelestialStarProps {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const CelestialStar: React.FC<CelestialStarProps> = ({
  size = 24,
  color = '#FFFFFF',
  className = '',
  style = {},
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', filter: `drop-shadow(0 0 8px ${color})`, ...style }}
    >
      <path
        d="M12 0C12 7 17 12 24 12C17 12 12 17 12 24C12 17 7 12 0 12C7 12 12 7 12 0Z"
        fill={color}
      />
    </svg>
  );
};

export const Constellation: React.FC<{ style?: React.CSSProperties }> = ({ style = {} }) => {
  return (
    <svg
      width="120"
      height="80"
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.75, ...style }}
    >
      <line x1="20" y1="20" x2="50" y2="40" stroke="#C4B5FD" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="50" y1="40" x2="80" y2="25" stroke="#C4B5FD" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="80" y1="25" x2="105" y2="55" stroke="#C4B5FD" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="20" cy="20" r="3" fill="#FFFFFF" filter="drop-shadow(0 0 4px #A79BF2)" />
      <circle cx="50" cy="40" r="2.5" fill="#FFFFFF" filter="drop-shadow(0 0 4px #A79BF2)" />
      <circle cx="80" cy="25" r="3" fill="#FFFFFF" filter="drop-shadow(0 0 4px #A79BF2)" />
      <circle cx="105" cy="55" r="3.5" fill="#FFFFFF" filter="drop-shadow(0 0 6px #FFFFFF)" />
    </svg>
  );
};
