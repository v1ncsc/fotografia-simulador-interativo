import React from 'react';

const iconProps = {
  className: "w-6 h-6",
  strokeWidth: 1.5,
  stroke: "currentColor",
  fill: "none",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const ApertureIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...iconProps}>
    <circle cx="12" cy="12" r="3.5" />
    <path d="M12 1.5v21" />
    <path d="M17.47 3.53l-1.01 1.01" />
    <path d="M20.48 6.52l-1.01-1.01" />
    <path d="M3.53 17.47l1.01-1.01" />
    <path d="M6.52 20.48l1.01 1.01" />
    <path d="M3.53 6.52l1.01 1.01" />
    <path d="M6.52 3.53l1.01-1.01" />
    <path d="M17.47 20.48l-1.01-1.01" />
    <path d="M20.48 17.47l-1.01 1.01" />
  </svg>
);

export const ShutterSpeedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...iconProps}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 12L8 8" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="M22 12h-2" />
    <path d="M4 12H2" />
  </svg>
);

export const ISOIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...iconProps}>
        <path d="M8 12h2a2 2 0 100-4H8v4z" />
        <path d="M10 12v4" />
        <path d="M14 16V8h2" />
        <rect x="2" y="4" width="20" height="16" rx="2" />
    </svg>
);


export const WhiteBalanceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...iconProps}>
    <path d="M12 2L6 22h12L12 2z" fill="white" />
    <path d="M12 2L6 22h3l1-4h4l1 4h3L12 2z" />
    <path d="M10.5 14l1.5-6 1.5 6h-3z" />
  </svg>
);

export const FocalLengthIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...iconProps}>
    <circle cx="12" cy="12" r="2" />
    <path d="M12 8V6" />
    <path d="M12 18v-2" />
    <path d="M16 12h2" />
    <path d="M6 12H4" />
    <rect x="2" y="2" width="20" height="20" rx="2" />
  </svg>
);
