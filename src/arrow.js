import React from 'react';
import styles from './styles';

export function PrevArrowButton({ className }) {
  return (
    <div className={className}>
      <svg
        style={styles.arrowButtonSvg}
        width="36px"
        height="36px"
        viewBox="0 0 24 24"
      >
        <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
      </svg>
    </div>
  );
}

export function NextArrowButton({ className }) {
  return (
    <div className={className}>
      <svg
        style={styles.arrowButtonSvg}
        width="36px"
        height="36px"
        viewBox="0 0 24 24"
      >
        <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
      </svg>
    </div>
  );
}
