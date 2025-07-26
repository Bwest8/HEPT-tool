import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options: Array<{ value: string; label: string }>;
}

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