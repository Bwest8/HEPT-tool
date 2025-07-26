import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({ error, className = '', ...props }) => {
  return (
    <textarea
      className={`
        w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-vertical
        text-gray-900 placeholder-gray-500 bg-white
        ${error 
          ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
          : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
        }
        ${className}
      `}
      {...props}
    />
  );
};