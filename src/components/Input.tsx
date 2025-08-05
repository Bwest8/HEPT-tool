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
    : 'w-full h-12 px-4 py-3 text-base border-2 rounded-none bg-white text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200';
  
  /** Error state styling classes */
  const errorClasses = isGridInput
    ? (error ? 'focus:ring-red-200' : 'focus:ring-blue-200')
    : (error 
        ? 'border-red-500 focus:border-red-600 focus:ring-red-200' 
        : 'border-gray-400 hover:border-gray-600 focus:border-blue-600');
  
  /** Read-only state styling classes */
  const readOnlyClasses = props.readOnly 
    ? 'bg-gray-100 cursor-not-allowed border-gray-300 text-gray-600' 
    : '';
  
  // === Render ===
  return (
    <input
      className={`
        ${baseClasses}
        ${errorClasses}
        ${readOnlyClasses}
        ${className}
      `}
      aria-describedby={error ? "input-error" : undefined}
      {...props}
    />
  );
};
