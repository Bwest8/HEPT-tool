import React from 'react';

// === Component Imports ===
import { FormField } from './FormField';
import { RadioGroup } from './RadioGroup';
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
    <div className="space-y-6">
      {/* Question 1: Private Tutoring Existence */}
      <FormField 
        label="1. Did the district have students fulfilling compulsory attendance requirements in Private Tutoring at the end of the school year?" 
        required 
        error={errors.q1_private_tutoring_exists}
      >
        <RadioGroup
          name="q1_private_tutoring_exists"
          value={formData.q1_private_tutoring_exists}
          onChange={(value) => onInputChange('q1_private_tutoring_exists', value)}
          options={[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]}
          error={!!errors.q1_private_tutoring_exists}
        />
      </FormField>

      {/* Question 2: Student Count (conditional) */}
      {formData.q1_private_tutoring_exists === 'yes' && (
        <FormField 
          label="2. If your answer to question 1 is yes, provide the number of students fulfilling compulsory attendance requirements in Private Tutoring at end of the school year." 
          required 
          error={errors.q2_private_tutoring_student_count}
        >
          <Input
            type="text"
            value={formData.q2_private_tutoring_student_count.toString()}
            onChange={(e) => onNumberInput('q2_private_tutoring_student_count', e.target.value)}
            className="w-32"
            error={!!errors.q2_private_tutoring_student_count}
          />
        </FormField>
      )}
    </div>
  );
};
