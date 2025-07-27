import React from 'react';

/**
 * Props interface for FormSection component
 */
interface FormSectionProps {
  /** Title to display in the section header */
  title: string;
  /** Child components to render inside the section */
  children: React.ReactNode;
  /** Additional CSS classes to apply to the container */
  className?: string;
}

/**
 * Form section container with styled header and content area
 * Provides consistent styling for form sections throughout the application
 */
export const FormSection: React.FC<FormSectionProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      {/* Section Header with Gradient Background */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      
      {/* Section Content */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
