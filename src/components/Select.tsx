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
        w-full h-12 px-4 py-3 text-base border-2 rounded-none bg-white text-gray-900 cursor-pointer
        transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200
        ${error 
          ? 'border-red-500 focus:border-red-600 focus:ring-red-200' 
          : 'border-gray-400 hover:border-gray-600 focus:border-blue-600'
        }
        ${className}
      `}
      aria-describedby={error ? "select-error" : undefined}
      {...props}
    >
      <option value="" disabled>
        - Select an option -
      </option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
