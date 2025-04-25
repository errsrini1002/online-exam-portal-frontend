import React from 'react';

export const Input = ({ type = 'text', name, value, onChange, placeholder, className = '' }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none ${className}`}
  />
);