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
  /** Optional id to enable anchor navigation */
  id?: string;
}

/**
 * Form section container with styled header and content area
 * Provides consistent styling for form sections throughout the application
 */
export const FormSection: React.FC<FormSectionProps> = ({ title, children, className = '', id }) => {
  return (
  <section id={id} className={`bg-white border-2 border-gray-300 mb-8 scroll-mt-24 ${className}`}>
      {/* Section Header */}
      <div className="bg-blue-600 px-6 py-4 border-b-2 border-blue-700">
        <h2 className="text-xl font-bold text-white leading-tight">{title}</h2>
      </div>
      
      {/* Section Content */}
      <div className="p-6 space-y-6">
        {children}
      </div>
    </section>
  );
};
