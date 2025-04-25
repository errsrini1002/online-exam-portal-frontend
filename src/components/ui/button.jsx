import React from 'react';

export const Button = ({ onClick, children, type = 'button', variant = 'default', className = '' }) => {
  const base = 'px-4 py-2 rounded-md font-medium';
  const styles = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};