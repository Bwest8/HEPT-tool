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
        <div id="error-summary" className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <h3 className="font-semibold text-red-800">Please correct the following errors:</h3>
          </div>
          <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
            {Object.entries(errors)
              .filter(([error]) => error && error.trim() !== '')
              .map(([field, error]) => (
                <li key={field}>{error}</li>
              ))}
          </ul>
        </div>
      )}
      
      {/* === Success Message (shown when operation completes successfully) === */}
      {successMessage && Object.keys(errors).length === 0 && (
        <div id="success-message" className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-800">{successMessage}</h3>
          </div>
        </div>
      )}
    </>
  );
};
