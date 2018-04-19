import React from 'react';

// eslint-disable-next-line react/prop-types
export function CloseArrow({ className, ...props }) {
  return (
    <div className={className} {...props}>
      <svg fill="#ffffff" width="24px" height="24px" viewBox="0 0 24 24">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
      </svg>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
export function PrevArrowButton({ className, ...props }) {
  return (
    <div className={className} {...props}>
      <svg fill="#ffffff" width="36px" height="36px" viewBox="0 0 24 24">
        <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
      </svg>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
export function NextArrowButton({ className, ...props }) {
  return (
    <div className={className} {...props}>
      <svg fill="#ffffff" width="36px" height="36px" viewBox="0 0 24 24">
        <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
      </svg>
    </div>
  );
}
