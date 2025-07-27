import React from 'react';

// === Component Imports ===
import { FormField } from './FormField';
import { RadioGroup } from './RadioGroup';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { EnrollmentGrid } from './EnrollmentGrid';

// === Type Imports ===
import { FormData, ValidationErrors } from '../types/form';

/**
 * Props interface for HomeschoolingSection component
 */
interface HomeschoolingSectionProps {
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
 * Homeschooling section of the form
 * Handles all questions related to home education students, including
 * enrollment grids, affidavits, special education, and program participation
 */
export const HomeschoolingSection: React.FC<HomeschoolingSectionProps> = ({
  formData,
  errors,
  onInputChange,
  onNumberInput
}) => {
  // Calculate total homeschooled students from enrollment grid
  const q4Total = Object.values(formData.q4_enrollments).reduce((sum, val) => sum + (val || 0), 0);

  return (
    <div className="space-y-6">
      {/* Question 3: Homeschooling Existence */}
      <FormField 
        label="3. Did the district have any home educated students?" 
        required 
        error={errors.q3_homeschooling_exists}
      >
        <RadioGroup
          name="q3_homeschooling_exists"
          value={formData.q3_homeschooling_exists}
          onChange={(value) => onInputChange('q3_homeschooling_exists', value)}
          options={[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]}
          error={!!errors.q3_homeschooling_exists}
        />
      </FormField>

      {/* Question 4: Student Enrollment Grid */}
      <FormField 
        label="4. If your answer to question 3 is yes, list the number of home educated students by age and gender."
        error={errors.q4_enrollments}
      >
        <EnrollmentGrid
          enrollments={formData.q4_enrollments}
          onChange={(enrollments) => onInputChange('q4_enrollments', enrollments)}
          disabled={formData.q3_homeschooling_exists !== 'yes'}
        />
      </FormField>

      {/* Conditional Questions (only shown when homeschooling exists) */}
      {formData.q3_homeschooling_exists === 'yes' && (
        <>
          {/* === Basic Homeschooling Questions === */}
          <div className="space-y-6">
            {/* Question 5: Affidavits Rejected */}
            <FormField 
              label="5. Number of affidavits rejected and returned to the home education supervisor?" 
              required 
              error={errors.q5_affidavits_rejected}
            >
              <Input
                type="text"
                value={formData.q5_affidavits_rejected.toString()}
                onChange={(e) => onNumberInput('q5_affidavits_rejected', e.target.value)}
                className="w-32"
                error={!!errors.q5_affidavits_rejected}
              />
            </FormField>

            {/* Question 6: Affidavit Return Reasons (conditional) */}
            {formData.q5_affidavits_rejected > 0 && (
              <FormField 
                label="6. Specific reason(s) for return of the affidavit:" 
                required 
                error={errors.q6_affidavit_return_reasons}
              >
                <Textarea
                  value={formData.q6_affidavit_return_reasons}
                  onChange={(e) => onInputChange('q6_affidavit_return_reasons', e.target.value)}
                  rows={3}
                  maxLength={250}
                  placeholder="Please describe the reasons..."
                  error={!!errors.q6_affidavit_return_reasons}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {formData.q6_affidavit_return_reasons.length}/250 characters
                </div>
              </FormField>
            )}

            {/* Question 7: Special Education Students */}
            <FormField 
              label="7. Number of homeschooled students that were special education (excluding gifted students)." 
              required 
              error={errors.q7_special_ed_student_count}
            >
              <Input
                type="text"
                value={formData.q7_special_ed_student_count.toString()}
                onChange={(e) => onNumberInput('q7_special_ed_student_count', e.target.value)}
                className="w-32"
                error={!!errors.q7_special_ed_student_count}
              />
              <div className="text-xs text-gray-500 mt-1">
                Total homeschooled students: {q4Total}
              </div>
            </FormField>
          </div>

          {/* === Special Education Services Section === */}
          <div className="bg-blue-50 rounded-lg p-6 space-y-6">
            <h4 className="text-lg font-semibold text-blue-900 border-b border-blue-200 pb-2">
              Special Education Services
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Question 8: Students Receiving Special Education Services */}
              <FormField 
                label="8. Number of students receiving services for special education" 
                required 
                error={errors.q8_special_ed_services_student_count}
              >
                <Input
                  type="text"
                  value={formData.q8_special_ed_services_student_count.toString()}
                  onChange={(e) => onNumberInput('q8_special_ed_services_student_count', e.target.value)}
                  className="w-32"
                  error={!!errors.q8_special_ed_services_student_count}
                />
                <div className="text-xs text-gray-600 mt-1 bg-gray-50 px-2 py-1 rounded">
                  Special education students: {formData.q7_special_ed_student_count}
                </div>
              </FormField>

              {/* Question 9: Curricular Materials Requests */}
              <FormField 
                label="9. Number of home education supervisors requesting curricular materials" 
                required 
                error={errors.q9_curricular_materials_request_count}
              >
                <Input
                  type="text"
                  value={formData.q9_curricular_materials_request_count.toString()}
                  onChange={(e) => onNumberInput('q9_curricular_materials_request_count', e.target.value)}
                  className="w-32"
                  error={!!errors.q9_curricular_materials_request_count}
                />
              </FormField>
            </div>
          </div>

          {/* === Program Evaluation & Compliance Section === */}
          <div className="bg-amber-50 rounded-lg p-6 space-y-6">
            <h4 className="text-lg font-semibold text-amber-900 border-b border-amber-200 pb-2">
              Program Evaluation & Compliance
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Question 10: Inappropriate Programs */}
              <FormField 
                label="10. Number of home education programs deemed inappropriate" 
                required 
                error={errors.q10_inappropriate_programs_count}
              >
                <Input
                  type="text"
                  value={formData.q10_inappropriate_programs_count.toString()}
                  onChange={(e) => onNumberInput('q10_inappropriate_programs_count', e.target.value)}
                  className="w-32"
                  error={!!errors.q10_inappropriate_programs_count}
                />
              </FormField>

              {/* Question 11: Hearings Held */}
              <FormField 
                label="11. Number of hearings held regarding inappropriate programs" 
                required 
                error={errors.q11_inappropriate_program_hearings_count}
              >
                <Input
                  type="text"
                  value={formData.q11_inappropriate_program_hearings_count.toString()}
                  onChange={(e) => onNumberInput('q11_inappropriate_program_hearings_count', e.target.value)}
                  className="w-32"
                  error={!!errors.q11_inappropriate_program_hearings_count}
                />
              </FormField>
            </div>
          </div>

          {/* === Student Participation in District Programs Section === */}
          <div className="bg-green-50 rounded-lg p-6 space-y-6">
            <h4 className="text-lg font-semibold text-green-900 border-b border-green-200 pb-2">
              Student Participation in District Programs
            </h4>
            
            <div className="space-y-6">
              {/* Question 12: CTC Programs */}
              <FormField 
                label="12. Number of homeschooled students in CTC programs" 
                required 
                error={errors.q12_ctc_student_count}
              >
                <Input
                  type="text"
                  value={formData.q12_ctc_student_count.toString()}
                  onChange={(e) => onNumberInput('q12_ctc_student_count', e.target.value)}
                  className="w-32"
                  error={!!errors.q12_ctc_student_count}
                />
              </FormField>

              {/* Question 13: Cocurricular Programs */}
              <FormField 
                label="13. Number of homeschooled students in cocurricular programs" 
                required 
                error={errors.q13_cocurricular_student_count}
              >
                <Input
                  type="text"
                  value={formData.q13_cocurricular_student_count.toString()}
                  onChange={(e) => onNumberInput('q13_cocurricular_student_count', e.target.value)}
                  className="w-32"
                  error={!!errors.q13_cocurricular_student_count}
                />
              </FormField>

              {/* Question 14: Academic Programs */}
              <FormField 
                label="14. Number of homeschooled students in academic programs" 
                required 
                error={errors.q14_academic_program_student_count}
              >
                <Input
                  type="text"
                  value={formData.q14_academic_program_student_count.toString()}
                  onChange={(e) => onNumberInput('q14_academic_program_student_count', e.target.value)}
                  className="w-32"
                  error={!!errors.q14_academic_program_student_count}
                />
              </FormField>

              {/* Question 15: Total Program Participants */}
              <FormField 
                label="15. Total number of homeschooled students in ANY program" 
                required 
                error={errors.q15_any_program_student_count}
              >
                <Input
                  type="text"
                  value={formData.q15_any_program_student_count.toString()}
                  onChange={(e) => onNumberInput('q15_any_program_student_count', e.target.value)}
                  className="w-32"
                  error={!!errors.q15_any_program_student_count}
                />
              </FormField>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
