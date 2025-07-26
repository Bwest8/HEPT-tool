import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  error?: boolean;
}

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