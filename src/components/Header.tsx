import React from 'react';

/**
 * Header component for the application
 * Displays the main title and key information about the form
 */
export const Header: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-700 to-indigo-800 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            {/* Main Title */}
            <h1 className="text-4xl font-bold mb-4 text-white">
              Home Education and Private Tutoring Annual Report
            </h1>
            
            {/* Subtitle Information */}
            <div className="flex items-center justify-center space-x-4 text-blue-100 text-lg">
              <span>Pennsylvania Department of Education</span>
              <span className="w-2 h-2 rounded-full bg-blue-200"></span>
              <span>Act 169 of 1988</span>
              <span className="w-2 h-2 rounded-full bg-blue-200"></span>
              <span>PIMS Submission</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
