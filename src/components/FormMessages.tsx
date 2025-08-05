import React from 'react';

// === Icon Imports ===
import { AlertCircle, FileText } from 'lucide-react';

// === Type Imports ===
import { ValidationErrors } from '../types/form';

/**
 * Props interface for FormMessages component
 */
interface FormMessagesProps {
  /** Whether the form has been submitted */
  submitted: boolean;
  /** Validation errors object */
  errors: ValidationErrors;
  /** Success message to display */
  successMessage: string;
}

/**
 * Form messages component that displays validation errors and success messages
 * Shows error summary when form is submitted with validation errors
 * Shows success message when form operations complete successfully
 */
export const FormMessages: React.FC<FormMessagesProps> = ({ submitted, errors, successMessage }) => {
  return (
    <>
      {/* === Error Summary (shown when form is submitted with errors) === */}
      {submitted && Object.keys(errors).length > 0 && (
        <div id="error-summary" className="bg-red-50 border-2 border-red-400 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <h3 className="font-semibold text-red-900 text-lg">Please correct the following errors:</h3>
          </div>
          <ul className="space-y-2">
            {Object.entries(errors)
              .filter(([error]) => error && error.trim() !== '')
              .map(([field, error]) => (
                <li key={field} className="flex items-start gap-2 text-red-800">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-base">{error}</span>
                </li>
              ))}
          </ul>
        </div>
      )}
      
      {/* === Success Message (shown when operation completes successfully) === */}
      {successMessage && Object.keys(errors).length === 0 && (
        <div id="success-message" className="bg-green-50 border-2 border-green-400 p-6 mb-6">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-green-900 text-lg">{successMessage}</h3>
          </div>
        </div>
      )}
    </>
  );
};
