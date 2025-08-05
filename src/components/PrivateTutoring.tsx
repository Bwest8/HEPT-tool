import React from 'react';

// === Component Imports ===
import { FormField } from './FormField';
import { Input } from './Input';

// === Type Imports ===
import { FormData, ValidationErrors } from '../types/form';

/**
 * Props interface for PrivateTutoring component
 */
interface PrivateTutoringProps {
  /** Form data object containing all form values */
  formData: FormData;
  /** Validation errors object */
  errors: ValidationErrors;
  /** Handler for general input changes */
  onInputChange: (field: keyof FormData, value: any) => void;
  /** Handler for numeric input validation */
  onNumberInput: (field: keyof FormData, value: string) => void;
}

/**
 * Private Tutoring section of the form
 * Handles questions about private tutoring students and counts
 */
export const PrivateTutoring: React.FC<PrivateTutoringProps> = ({
  formData,
  errors,
  onInputChange,
  onNumberInput
}) => {
  return (
    <div className="space-y-8">
      {/* Question 1: Private Tutoring Existence */}
      <FormField
        label="1. Did the district have students fulfilling compulsory attendance requirements in Private Tutoring at the end of the school year?"
        required
        error={errors.q1_private_tutoring_exists}
      >
        <fieldset className="space-y-3">
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors duration-150">
              <input
                type="radio"
                name="q1_private_tutoring_exists"
                value="yes"
                checked={formData.q1_private_tutoring_exists === 'yes'}
                onChange={(e) => onInputChange('q1_private_tutoring_exists', e.target.value)}
                className="w-5 h-5 border-2 border-gray-400 text-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200"
                aria-describedby={errors.q1_private_tutoring_exists ? "q1-error" : undefined}
              />
              <span className="text-base font-medium text-gray-900 leading-tight">Yes</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors duration-150">
              <input
                type="radio"
                name="q1_private_tutoring_exists"
                value="no"
                checked={formData.q1_private_tutoring_exists === 'no'}
                onChange={(e) => onInputChange('q1_private_tutoring_exists', e.target.value)}
                className="w-5 h-5 border-2 border-gray-400 text-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200"
                aria-describedby={errors.q1_private_tutoring_exists ? "q1-error" : undefined}
              />
              <span className="text-base font-medium text-gray-900 leading-tight">No</span>
            </label>
          </div>
        </fieldset>
      </FormField>

      {/* Question 2: Student Count */}
      <FormField
        label="2. If your answer to question 1 is yes, provide the number of students fulfilling compulsory attendance requirements in Private Tutoring at end of the school year."
        required={formData.q1_private_tutoring_exists === 'yes'}
        error={errors.q2_private_tutoring_student_count}
      >
        {formData.q1_private_tutoring_exists === 'yes' ? (
          <Input
            type="text"
            value={formData.q2_private_tutoring_student_count.toString()}
            onChange={(e) => onNumberInput('q2_private_tutoring_student_count', e.target.value)}
            className="w-32"
            aria-describedby={errors.q2_private_tutoring_student_count ? "q2-error" : undefined}
          />
        ) : (
          <div className="bg-gray-100 border-2 border-gray-300 p-4 text-base text-gray-600">
            <strong>Note:</strong> This section will be enabled when you select "Yes" for private tutoring question above.
          </div>
        )}
      </FormField>
    </div>
  );
};
