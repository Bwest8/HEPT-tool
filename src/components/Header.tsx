import React from 'react';

/**
 * Header component for the application
 * Displays the main title and key information about the form
 */
export const Header: React.FC = () => {
  return (
    <header className="bg-blue-700 border-b-4 border-blue-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            {/* Main Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">
              Home Education and Private Tutoring Annual Report
            </h1>
            
            {/* Subtitle Information */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-blue-100 text-base md:text-lg">
              <span className="font-medium">Pennsylvania Department of Education</span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-blue-200" aria-hidden="true"></span>
              <span className="font-medium">Act 169 of 1988</span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-blue-200" aria-hidden="true"></span>
              <span className="font-medium">PIMS Submission</span>
            </div>
            
            {/* Additional Context */}
            <div className="mt-4 text-blue-100 text-sm max-w-3xl mx-auto">
              Complete this form to report home education and private tutoring enrollment data for your district.
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
