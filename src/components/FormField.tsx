import React from 'react';

/**
 * Props interface for FormField component
 */
interface FormFieldProps {
  /** Label text for the form field */
  label: string;
  /** Whether the field is required */
  required?: boolean;
  /** Validation error message */
  error?: string;
  /** Child components (input elements) */
  children: React.ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
}

/**
 * Form field wrapper component that provides consistent labeling and error display
 * Wraps form inputs with standardized styling and accessibility features
 */
export const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  required = false, 
  error, 
  children, 
  className = '' 
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      {/* Field Label */}
      <label className="block text-base font-bold text-gray-900 mb-2 leading-tight">
        {label}
        {required && (
          <span className="text-red-600 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
      
      {/* Input Element */}
      {children}
      
      {/* Error Message */}
      {error && (
        <div 
          className="mt-2 p-3 bg-red-50 border-l-4 border-red-600 rounded-r"
          role="alert"
          id={error ? "field-error" : undefined}
        >
          <p className="text-sm font-medium text-red-800 flex items-start gap-2">
            <svg 
              className="w-5 h-5 mt-0.5 flex-shrink-0" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </p>
        </div>
      )}
    </div>
  );
};
