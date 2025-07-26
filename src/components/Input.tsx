import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({ error, className = '', ...props }) => {
  // Check if this is a grid input (has border-0 in className)
  const isGridInput = className.includes('border-0');
  
  const baseClasses = isGridInput 
    ? 'w-full focus:outline-none transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white'
    : 'w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white';
  
  const errorClasses = isGridInput
    ? (error ? 'focus:ring-red-200' : 'focus:ring-blue-500')
    : (error 
        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
        : 'border-gray-300 hover:border-gray-400 focus:border-blue-500');
  
  const readOnlyClasses = props.readOnly ? 'bg-gray-50 cursor-not-allowed' : '';
  
  return (
    <input
      className={`
        ${baseClasses}
        ${errorClasses}
        ${readOnlyClasses}
        ${className}
      `}
      {...props}
    />
  );
};