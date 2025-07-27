import React from 'react';

// === Icon Imports ===
import { AlertCircle } from 'lucide-react';

/**
 * Important Reminders component
 * Displays key information and requirements for form completion and submission
 */
export const ImportantReminders: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border-l-4 border-blue-500 rounded-r-lg p-6 shadow-md">
      <div className="flex items-start gap-4">
        {/* Alert Icon */}
        <div>
          <AlertCircle className="w-8 h-8 text-blue-500" />
        </div>
        
        {/* Content */}
        <div>
          <h3 className="font-semibold text-xl text-blue-900 mb-3">Important Reminders & Support</h3>
          
          <div className="space-y-3 text-sm text-gray-800">
            {/* Reporting Scope */}
            <p><strong>Reporting Scope:</strong> Report all children being educated at home per Act 169 of 1988 (24 P.S. Sec. 13-1327.1). Do NOT include students in Homebound Instruction or Instruction in the Home.</p>
            
            {/* Submission Mandate */}
            <p><strong>Submission Mandate:</strong> A report must be submitted for each school district, even when the response would be zero or the form does not apply to your school district.</p>
            
            {/* File Submission */}
            <p><strong>File Submission:</strong> Provide the generated .csv file to your PIMS administrator for upload into the PIMS system as a District Fact template. Only a PIMS administrator has the ability to upload this file.</p>
            
            {/* Support Information */}
            <div className="mt-4 pt-3 border-t border-blue-200">
              <p className="font-semibold">Questions?</p>
              <p>Email: <a href="mailto:ra-home-education@pa.gov" className="text-blue-600 hover:text-blue-800 underline transition-colors">ra-home-education@pa.gov</a></p>
              <p>Visit: <a href="https://www.education.pa.gov/K-12/Home%20Education%20and%20Private%20Tutoring/Pages/default.aspx" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline transition-colors">Home Education and Private Tutoring webpage</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
