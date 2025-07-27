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
    <div className="flex gap-6">
      {options.map(option => (
        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-4 h-4 transition-colors ${
              error 
                ? 'text-red-600 focus:ring-red-200' 
                : 'text-blue-600 focus:ring-blue-200'
            }`}
          />
          <span className="text-sm font-medium text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
};
