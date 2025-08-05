import React from 'react';

/**
 * Props interface for Textarea component
 * Extends standard HTML textarea attributes
 */
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Whether the textarea has validation errors */
  error?: boolean;
}

/**
 * Styled textarea component with consistent theming and error states
 * Provides vertical resizing and consistent focus styling
 */
export const Textarea: React.FC<TextareaProps> = ({ error, className = '', ...props }) => {
  return (
    <textarea
      className={`
        w-full min-h-32 px-4 py-3 text-base border-2 rounded-none bg-white text-gray-900 placeholder-gray-500
        transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200 resize-vertical
        ${error 
          ? 'border-red-500 focus:border-red-600 focus:ring-red-200' 
          : 'border-gray-400 hover:border-gray-600 focus:border-blue-600'
        }
        ${className}
      `}
      aria-describedby={error ? "textarea-error" : undefined}
      {...props}
    />
  );
};
