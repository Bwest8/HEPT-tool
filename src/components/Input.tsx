import React from 'react';

/**
 * Props interface for Input component
 * Extends standard HTML input attributes
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Whether the input has validation errors */
  error?: boolean;
}

/**
 * Styled input component with consistent theming and error states
 * Handles both regular form inputs and grid inputs (borderless)
 */
export const Input: React.FC<InputProps> = ({ error, className = '', ...props }) => {
  // === Style Configuration ===
  /** Check if this is a grid input (has border-0 in className) */
  const isGridInput = className.includes('border-0');
  
  /** Base styling classes */
  const baseClasses = isGridInput 
    ? 'w-full focus:outline-none transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white'
    : 'w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white';
  
  /** Error state styling classes */
  const errorClasses = isGridInput
    ? (error ? 'focus:ring-red-200' : 'focus:ring-blue-500')
    : (error 
        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
        : 'border-gray-300 hover:border-gray-400 focus:border-blue-500');
  
  /** Read-only state styling classes */
  const readOnlyClasses = props.readOnly ? 'bg-gray-50 cursor-not-allowed' : '';
  
  // === Render ===
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
