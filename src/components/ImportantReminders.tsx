import React from 'react';

// === Icon Imports ===
import { AlertCircle } from 'lucide-react';

/**
 * Important Reminders component
 * Displays key information and requirements for form completion and submission
 */
export const ImportantReminders: React.FC = () => {
  return (
    <div
      className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8"
      role="region"
      aria-labelledby="reminders-heading"
    >
      <div className="flex items-start gap-4">
        {/* Alert Icon */}
        <div className="flex-shrink-0">
          <AlertCircle className="w-8 h-8 text-blue-600" aria-hidden="true" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 id="reminders-heading" className="font-bold text-xl text-blue-900 mb-4 leading-tight">
            Important Reminders & Support
          </h3>

          <div className="space-y-4 text-base text-gray-900">
            {/* Reporting Scope */}
            <div>
              <p className="font-bold text-gray-900 mb-1">Reporting Scope:</p>
              <p>Report all children being educated at home per Act 169 of 1988 (24 P.S. Sec. 13-1327.1). Do NOT include students in Homebound Instruction or Instruction in the Home.</p>
            </div>

            {/* Submission Mandate */}
            <div>
              <p className="font-bold text-gray-900 mb-1">Submission Mandate:</p>
              <p>A report must be submitted for each school district, even when the response would be zero or the form does not apply to your school district.</p>
            </div>

            {/* File Submission */}
            <div>
              <p className="font-bold text-gray-900 mb-1">File Submission:</p>
              <p>Provide the generated .csv file to your PIMS administrator for upload into the PIMS system as a District Fact template. Only a PIMS administrator has the ability to upload this file.</p>
            </div>

            {/* Support Information */}
            <div className="mt-6 pt-4 border-t-2 border-blue-200">
              <p className="font-bold text-gray-900 mb-2">Questions or Need Help?</p>
              <div className="space-y-1">
                <p>
                  <span className="font-medium">Email:</span>{' '}
                  <a
                    href="mailto:ra-home-education@pa.gov"
                    className="text-blue-700 underline hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                  >
                    ra-home-education@pa.gov
                  </a>
                </p>
                <p>
                  <span className="font-medium">Website:</span>{' '}
                  <a
                    href="https://www.pa.gov/agencies/education/programs-and-services/instruction/elementary-and-secondary-education/home-education-and-private-tutoring"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                  >
                    Home Education and Private Tutoring webpage
                    <span className="sr-only"> (opens in new window)</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
