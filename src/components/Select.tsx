import React from 'react';

/**
 * Interface for select options
 */
interface SelectOption {
  /** Value for the select option */
  value: string;
  /** Display label for the select option */
  label: string;
}

/**
 * Props interface for Select component
 * Extends standard HTML select attributes
 */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Whether the select has validation errors */
  error?: boolean;
  /** Array of select options */
  options: SelectOption[];
}

/**
 * Styled select dropdown component with consistent theming and error states
 * Provides a default "Select..." option and consistent focus styling
 */
export const Select: React.FC<SelectProps> = ({ error, options, className = '', ...props }) => {
  return (
    <select
      className={`
        w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white
        text-gray-900 cursor-pointer
        ${error 
          ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
          : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
        }
        ${className}
      `}
      {...props}
    >
      <option value="">Select...</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
