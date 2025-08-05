import React from 'react';

/**
 * Interface for radio button options
 */
interface RadioOption {
  /** Value for the radio button */
  value: string;
  /** Display label for the radio button */
  label: string;
}

/**
 * Props interface for RadioGroup component
 */
interface RadioGroupProps {
  /** Name attribute for the radio group */
  name: string;
  /** Currently selected value */
  value: string;
  /** Handler for value changes */
  onChange: (value: string) => void;
  /** Array of radio button options */
  options: RadioOption[];
  /** Whether the group has validation errors */
  error?: boolean;
}

/**
 * Radio group component for selecting single options
 * Provides a horizontal layout of radio buttons with consistent styling
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({ name, value, onChange, options, error }) => {
  return (
    <fieldset className="space-y-3">
      <div className="flex flex-wrap gap-6">
        {options.map(option => (
          <label 
            key={option.value} 
            className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors duration-150"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className={`w-5 h-5 border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
                error 
                  ? 'border-red-500 text-red-600 focus:ring-red-200' 
                  : 'border-gray-400 text-blue-600 focus:ring-blue-200'
              }`}
              aria-describedby={error ? "radio-error" : undefined}
            />
            <span className="text-base font-medium text-gray-900 leading-tight">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};
