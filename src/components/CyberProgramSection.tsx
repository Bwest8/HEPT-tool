import React from 'react';

// === Component Imports ===
import { FormField } from './FormField';
import { RadioGroup } from './RadioGroup';
import { CyberProgramGrid } from './CyberProgramGrid';

// === Type Imports ===
import { FormData, ValidationErrors } from '../types/form';

/**
 * Props interface for CyberProgramSection component
 */
interface CyberProgramSectionProps {
  /** Form data object containing all form values */
  formData: FormData;
  /** Validation errors object */
  errors: ValidationErrors;
  /** Handler for general input changes */
  onInputChange: (field: keyof FormData, value: any) => void;
}

/**
 * Cyber Program section of the form
 * Handles questions about cyber program availability and grade level offerings
 */
export const CyberProgramSection: React.FC<CyberProgramSectionProps> = ({
  formData,
  errors,
  onInputChange
}) => {
  return (
    <div className="space-y-6">
      {/* === Program Availability Section === */}
      <div className="bg-purple-50 rounded-lg p-6 space-y-6">
        <h4 className="text-lg font-semibold text-purple-900 border-b border-purple-200 pb-2">
          Program Availability
        </h4>
        
        <FormField 
          label="16. Does the district have a cyber program, either district-run or provided by a vendor or another LEA?" 
          required 
          error={errors.q16_has_cyber_program}
        >
          <RadioGroup
            name="q16_has_cyber_program"
            value={formData.q16_has_cyber_program}
            onChange={(value) => onInputChange('q16_has_cyber_program', value)}
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' }
            ]}
            error={!!errors.q16_has_cyber_program}
          />
        </FormField>
      </div>

      {/* === Grade Level Offerings Section (conditional) === */}
      {formData.q16_has_cyber_program === 'yes' && (
        <div className="bg-indigo-50 rounded-lg p-6 space-y-6">
          <h4 className="text-lg font-semibold text-indigo-900 border-b border-indigo-200 pb-2">
            Grade Level Offerings
          </h4>
          
          <div className="text-sm text-indigo-800 mb-4 bg-indigo-100 p-3 rounded">
            <strong>Note:</strong> Indicate whether the program is offered to students in each grade, even if no students in that grade participated in the reporting school year.
          </div>
          
          <FormField label="17. For each grade below, select whether the cyber program is offered:">
            <CyberProgramGrid
              selectedGrades={formData.q17_cyber_grades_offered}
              onChange={(grades) => onInputChange('q17_cyber_grades_offered', grades)}
              disabled={formData.q16_has_cyber_program !== 'yes'}
            />
          </FormField>
        </div>
      )}
    </div>
  );
};
