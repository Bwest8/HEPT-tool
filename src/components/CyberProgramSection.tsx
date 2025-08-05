import React from 'react';

// === Component Imports ===
import { FormField } from './FormField';
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
    <div className="space-y-8">
      {/* === Program Availability Section === */}
      <div className="bg-purple-50 border-2 border-purple-200 p-6 space-y-6">
        <h4 className="text-lg font-bold text-purple-900 border-b-2 border-purple-300 pb-3">
          Program Availability
        </h4>
        
        <FormField 
          label="16. Does the district have a cyber program, either district-run or provided by a vendor or another LEA?" 
          required 
          error={errors.q16_has_cyber_program}
        >
          <fieldset className="space-y-3">
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors duration-150">
                <input
                  type="radio"
                  name="q16_has_cyber_program"
                  value="yes"
                  checked={formData.q16_has_cyber_program === 'yes'}
                  onChange={(e) => onInputChange('q16_has_cyber_program', e.target.value)}
                  className="w-5 h-5 border-2 border-gray-400 text-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200"
                  aria-describedby={errors.q16_has_cyber_program ? "q16-error" : undefined}
                />
                <span className="text-base font-medium text-gray-900 leading-tight">Yes</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors duration-150">
                <input
                  type="radio"
                  name="q16_has_cyber_program"
                  value="no"
                  checked={formData.q16_has_cyber_program === 'no'}
                  onChange={(e) => onInputChange('q16_has_cyber_program', e.target.value)}
                  className="w-5 h-5 border-2 border-gray-400 text-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200"
                  aria-describedby={errors.q16_has_cyber_program ? "q16-error" : undefined}
                />
                <span className="text-base font-medium text-gray-900 leading-tight">No</span>
              </label>
            </div>
          </fieldset>
        </FormField>
      </div>

      {/* === Grade Level Offerings Section === */}
      <div className="bg-indigo-50 border-2 border-indigo-200 p-6 space-y-6">
        <h4 className="text-lg font-bold text-indigo-900 border-b-2 border-indigo-300 pb-3">
          Grade Level Offerings
        </h4>
        
        {formData.q16_has_cyber_program === 'yes' && (
          <div className="bg-indigo-100 border-2 border-indigo-300 p-4 text-base text-indigo-900">
            <strong>Important:</strong> Indicate whether the program is offered to students in each grade, even if no students in that grade participated in the reporting school year.
          </div>
        )}
        
        <FormField label="17. For each grade below, select whether the cyber program is offered:">
          {formData.q16_has_cyber_program === 'yes' ? (
            <CyberProgramGrid
              selectedGrades={formData.q17_cyber_grades_offered}
              onChange={(grades) => onInputChange('q17_cyber_grades_offered', grades)}
              disabled={formData.q16_has_cyber_program !== 'yes'}
            />
          ) : (
            <div className="bg-gray-100 border-2 border-gray-300 p-4 text-base text-gray-600">
              <strong>Note:</strong> This section will be enabled when you select "Yes" for cyber program question above.
            </div>
          )}
        </FormField>
      </div>
    </div>
  );
};
