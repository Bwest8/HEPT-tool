import React from 'react';

// === Component Imports ===
import { FormField } from './FormField';
import { Textarea } from './Textarea';

// === Type Imports ===
import { FormData, ValidationErrors } from '../types/form';

/**
 * Props interface for AdditionalComments component
 */
interface AdditionalCommentsProps {
  /** Form data object containing all form values */
  formData: FormData;
  /** Validation errors object */
  errors: ValidationErrors;
  /** Handler for general input changes */
  onInputChange: (field: keyof FormData, value: any) => void;
}

/**
 * Additional Comments section of the form
 * Handles optional comments from the user
 */
export const AdditionalComments: React.FC<AdditionalCommentsProps> = ({
  formData,
  errors,
  onInputChange
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 space-y-6">
      <FormField label="18. Comments (optional): (Please limit response to 250 characters.)" error={errors.q18_comments}>
        <Textarea
          value={formData.q18_comments}
          onChange={(e) => onInputChange('q18_comments', e.target.value)}
          rows={4}
          maxLength={250}
          placeholder="Optional comments about the data submitted..."
          error={!!errors.q18_comments}
        />
        <div className="text-xs text-gray-500 mt-1">
          {formData.q18_comments.length}/250 characters
        </div>
      </FormField>
    </div>
  );
};
