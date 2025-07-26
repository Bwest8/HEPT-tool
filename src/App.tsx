import React, { useState, useEffect } from 'react';
import { FormData, ValidationErrors } from './types/form';
import { validateForm, isValidNumber, formatPhoneNumber } from './utils/validation';
import { FormSection } from './components/FormSection';
import { FormField } from './components/FormField';
import { Input } from './components/Input';
import { Select } from './components/Select';
import { RadioGroup } from './components/RadioGroup';
import { Textarea } from './components/Textarea';
import { EnrollmentGrid } from './components/EnrollmentGrid';
import { CyberProgramGrid } from './components/CyberProgramGrid';
import { DistrictSelect } from './components/DistrictSelect';
import { FileText, Send, AlertCircle, Download } from 'lucide-react';
import { downloadCSV } from './utils/csvExport';
import { generateSchoolYearOptions } from './utils/schoolYear';

const initialFormData: FormData = {
  // District Information
  district_name: '',
  district_aun: '',
  school_year: '',
  contact_name: '',
  phone_number: '',
  phone_extension: '',
  email_address: '',

  // Private Tutoring
  q1_private_tutoring_exists: '',
  q2_private_tutoring_student_count: 0,

  // Homeschooling
  q3_homeschooling_exists: '',
  q5_affidavits_rejected: 0,
  q6_affidavit_return_reasons: '',
  q7_special_ed_student_count: 0,
  q8_special_ed_services_student_count: 0,
  q9_curricular_materials_request_count: 0,
  q10_inappropriate_programs_count: 0,
  q11_inappropriate_program_hearings_count: 0,
  q12_ctc_student_count: 0,
  q13_cocurricular_student_count: 0,
  q14_academic_program_student_count: 0,
  q15_any_program_student_count: 0,

  // Student Enrollment Grid
  q4_enrollments: {},

  // Cyber Program
  q16_has_cyber_program: '',
  q17_cyber_grades_offered: [],
  q18_comments: '',
};

function App() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Re-validate form on data change after initial submission
  useEffect(() => {
    if (submitted) {
      setErrors(validateForm(formData));
    }
  }, [formData, submitted]);

  // School year options (current and 4 previous years)
  const schoolYearOptions = generateSchoolYearOptions();

  // Calculate totals
  const q4Total = Object.values(formData.q4_enrollments).reduce((sum, val) => sum + (val || 0), 0);
  const totalTutoredAndHomeschooled = formData.q2_private_tutoring_student_count + q4Total;

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear success message on any input change
    if (successMessage) setSuccessMessage('');
  };

  const handleDistrictChange = (districtName: string, aun: string) => {
    setFormData(prev => ({ 
      ...prev, 
      district_name: districtName,
      district_aun: aun 
    }));
    // Clear success message on district change
    if (successMessage) setSuccessMessage('');
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    handleInputChange('phone_number', formatted);
  };

  const handleNumberInput = (field: keyof FormData, value: string) => {
    if (!isValidNumber(value)) return;
    handleInputChange(field, value === '' ? 0 : parseInt(value, 10));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    setSubmitted(true);

    if (Object.keys(validationErrors).length === 0) {
      // Form is valid - would normally submit to server
      alert('Form submitted successfully!');
    }
  };

  const handleExportCSV = () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(true);
      // Scroll to error summary after state updates
      setTimeout(() => {
        const errorSummary = document.getElementById('error-summary');
        if (errorSummary) {
          errorSummary.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 100);
      // Clear any previous success message
      if (successMessage) setSuccessMessage('');
      return;
    }
    const filename = downloadCSV(formData);
    setSuccessMessage(`Template "${filename}" generated and downloaded successfully!`);
    // Scroll to success message after state updates
    setTimeout(() => {
      const successMessage = document.getElementById('success-message');
      if (successMessage) {
        successMessage.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }, 100);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Home Education and Private Tutoring Annual Report
          </h1>
          <p className="text-sm text-gray-600">
            Pennsylvania Department of Education • Act 169 of 1988 • PIMS Submission
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
          {/* Important Reminders & Support - Moved to top */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">Important Reminders & Support</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p><strong>Reporting Scope:</strong> Report all children being educated at home per Act 169 of 1988 (24 P.S. Sec. 13-1327.1). Do NOT include students in Homebound Instruction or Instruction in the Home.</p>
              <p><strong>Submission Mandate:</strong> A report must be submitted for each school district, even when the response would be zero or the form does not apply to your school district.</p>
              <p><strong>File Submission:</strong> Provide the generated .csv file to your PIMS administrator for upload into the PIMS system as a District Fact template. Only a PIMS administrator has the ability to upload this file.</p>
              <div className="mt-3">
                <p><strong>Questions?</strong></p>
                <p>Email: <a href="mailto:ra-home-education@pa.gov" className="text-blue-600 hover:text-blue-800 underline">ra-home-education@pa.gov</a></p>
                <p>Visit: <a href="#" className="text-blue-600 hover:text-blue-800 underline">Home Education and Private Tutoring webpage</a></p>
              </div>
            </div>
          </div>

          {/* Error Summary - Moved to appear right after Important Reminders */}
          {submitted && Object.keys(errors).length > 0 && (
            <div id="error-summary" className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <h3 className="font-semibold text-red-800">Please correct the following errors:</h3>
              </div>
              <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                {Object.entries(errors)
                  .filter(([field, error]) => error && error.trim() !== '')
                  .map(([field, error]) => (
                    <li key={field}>{error}</li>
                  ))}
              </ul>
            </div>
          )}
          {/* Success Message */}
          {successMessage && Object.keys(errors).length === 0 && (
            <div id="success-message" className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-800">{successMessage}</h3>
              </div>
            </div>
          )}

          {/* District Information */}
          <FormSection title="District Information">
            <div className="space-y-6">
              {/* District Selection */}
              <div className="bg-indigo-50 rounded-lg p-6 space-y-6">
                <h4 className="text-lg font-semibold text-indigo-900 border-b border-indigo-200 pb-2">
                  District Selection
                </h4>
                <FormField label="District Name" required error={errors.district_name}>
                  <DistrictSelect
                    value={formData.district_name}
                    onChange={handleDistrictChange}
                    error={!!errors.district_name}
                  />
                </FormField>
                
                {/* Hidden AUN field - still needed for form validation and CSV export */}
                <input
                  type="hidden"
                  value={formData.district_aun}
                  name="district_aun"
                />
              </div>

              {/* Reporting Period */}
              <div className="bg-orange-50 rounded-lg p-6 space-y-6">
                <h4 className="text-lg font-semibold text-orange-900 border-b border-orange-200 pb-2">
                  Reporting Period
                </h4>
                <div className="text-sm text-orange-800 mb-4 bg-orange-100 p-3 rounded">
                  <strong>Important:</strong> Select the school year for which you are reporting data. This determines the reporting period and affects all data collection in this form.
                </div>
                <FormField label="School Year" required error={errors.school_year}>
                  <div className="max-w-sm">
                    <Select
                      value={formData.school_year}
                      onChange={(e) => handleInputChange('school_year', e.target.value)}
                      options={schoolYearOptions}
                      error={!!errors.school_year}
                    />
                  </div>
                </FormField>
              </div>

              {/* Contact Information */}
              <div className="bg-purple-50 rounded-lg p-6 space-y-6">
                <h4 className="text-lg font-semibold text-purple-900 border-b border-purple-200 pb-2">
                  Contact Information
                </h4>
                <div className="text-sm text-purple-800 mb-4 bg-purple-100 p-3 rounded">
                  <strong>Note:</strong> This contact person will be responsible for this report and any follow-up questions.
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField label="Contact Name" required error={errors.contact_name}>
                    <Input
                      type="text"
                      value={formData.contact_name}
                      onChange={(e) => handleInputChange('contact_name', e.target.value)}
                      placeholder="Enter full name"
                      error={!!errors.contact_name}
                    />
                  </FormField>

                  <FormField label="Email Address" required error={errors.email_address}>
                    <Input
                      type="email"
                      value={formData.email_address}
                      onChange={(e) => handleInputChange('email_address', e.target.value)}
                      placeholder="contact@district.edu"
                      error={!!errors.email_address}
                    />
                  </FormField>
                </div>

                <FormField label="Phone Number" required error={errors.phone_number}>
                  <div className="flex gap-1 max-w-sm">
                    <Input
                      type="text"
                      value={formData.phone_number}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="(555) 123-4567"
                      maxLength={14}
                      error={!!errors.phone_number}
                    />
                    <span className="flex items-center px-2 text-sm text-gray-500">Ext.</span>
                    <Input
                      type="text"
                      value={formData.phone_extension}
                      onChange={(e) => handleInputChange('phone_extension', e.target.value)}
                      placeholder="1234"
                      className="w-18"
                      maxLength={6}
                      error={!!errors.phone_extension}
                    />
                  </div>
                </FormField>
              </div>
            </div>
          </FormSection>

          {/* Private Tutoring */}
          <FormSection title="Private Tutoring">
            <div className="space-y-6">
              <FormField 
                label="1. Did the district have students fulfilling compulsory attendance requirements in Private Tutoring at the end of the school year? (See the Instructions tab for explanation.) This does NOT include homeschooled students!" 
                required 
                error={errors.q1_private_tutoring_exists}
              >
                <RadioGroup
                  name="q1_private_tutoring_exists"
                  value={formData.q1_private_tutoring_exists}
                  onChange={(value) => handleInputChange('q1_private_tutoring_exists', value)}
                  options={[
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' }
                  ]}
                  error={!!errors.q1_private_tutoring_exists}
                />
              </FormField>

              {formData.q1_private_tutoring_exists === 'yes' && (
                <FormField 
                  label="2. If your answer to question 1 is yes, provide the number of students fulfilling compulsory attendance requirements in Private Tutoring at end of the school year." 
                  required 
                  error={errors.q2_private_tutoring_student_count}
                >
                  <Input
                    type="text"
                    value={formData.q2_private_tutoring_student_count.toString()}
                    onChange={(e) => handleNumberInput('q2_private_tutoring_student_count', e.target.value)}
                    className="w-32"
                    error={!!errors.q2_private_tutoring_student_count}
                  />
                </FormField>
              )}
            </div>
          </FormSection>

          {/* Homeschooling */}
          <FormSection title="Homeschooling">
            <div className="space-y-6">
              <FormField 
                label="3. Did the district have any home educated students?" 
                required 
                error={errors.q3_homeschooling_exists}
              >
                <RadioGroup
                  name="q3_homeschooling_exists"
                  value={formData.q3_homeschooling_exists}
                  onChange={(value) => handleInputChange('q3_homeschooling_exists', value)}
                  options={[
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' }
                  ]}
                  error={!!errors.q3_homeschooling_exists}
                />
              </FormField>

              {/* Student Enrollment Grid */}
              <FormField 
                label="4. If your answer to question 3 is yes, list the number of home educated students by age and gender. They should be counted only if enrolled in home education at the close of the school year. Use their age as reported on the affidavit. Enter a zero (0) if none for any age/gender."
                error={errors.q4_enrollments}
              >
                <EnrollmentGrid
                  enrollments={formData.q4_enrollments}
                  onChange={(enrollments) => handleInputChange('q4_enrollments', enrollments)}
                  disabled={formData.q3_homeschooling_exists !== 'yes'}
                />
              </FormField>

              {formData.q3_homeschooling_exists === 'yes' && (
                <>
                  <div className="space-y-6">
                    <FormField 
                      label="5. Number of affidavits rejected and returned to the home education supervisor?" 
                      required 
                      error={errors.q5_affidavits_rejected}
                    >
                      <Input
                        type="text"
                        value={formData.q5_affidavits_rejected.toString()}
                        onChange={(e) => handleNumberInput('q5_affidavits_rejected', e.target.value)}
                        className="w-32"
                        error={!!errors.q5_affidavits_rejected}
                      />
                    </FormField>

                    {formData.q5_affidavits_rejected > 0 && (
                      <FormField 
                        label="6. Specific reason(s) for return of the affidavit: (Please limit response to 250 characters.)" 
                        required 
                        error={errors.q6_affidavit_return_reasons}
                      >
                        <Textarea
                          value={formData.q6_affidavit_return_reasons}
                          onChange={(e) => handleInputChange('q6_affidavit_return_reasons', e.target.value)}
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

                    <FormField 
                      label="7. Number of homeschooled students that were special education (excluding gifted students)." 
                      required 
                      error={errors.q7_special_ed_student_count}
                    >
                      <Input
                        type="text"
                        value={formData.q7_special_ed_student_count.toString()}
                        onChange={(e) => handleNumberInput('q7_special_ed_student_count', e.target.value)}
                        className="w-32"
                        error={!!errors.q7_special_ed_student_count}
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        Total homeschooled students: {q4Total}
                      </div>
                    </FormField>
                  </div>

                  {/* Special Education Questions */}
                  <div className="bg-blue-50 rounded-lg p-6 space-y-6">
                    <h4 className="text-lg font-semibold text-blue-900 border-b border-blue-200 pb-2">
                      Special Education Services
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField 
                        label="8. Number of students receiving services for special education" 
                        required 
                        error={errors.q8_special_ed_services_student_count}
                      >
                        <Input
                          type="text"
                          value={formData.q8_special_ed_services_student_count.toString()}
                          onChange={(e) => handleNumberInput('q8_special_ed_services_student_count', e.target.value)}
                          className="w-32"
                          error={!!errors.q8_special_ed_services_student_count}
                        />
                        <div className="text-xs text-gray-600 mt-1 bg-gray-50 px-2 py-1 rounded">
                          Special education students: {formData.q7_special_ed_student_count}
                        </div>
                      </FormField>

                      <FormField 
                        label="9. Number of home education supervisors requesting curricular materials from the district" 
                        required 
                        error={errors.q9_curricular_materials_request_count}
                      >
                        <Input
                          type="text"
                          value={formData.q9_curricular_materials_request_count.toString()}
                          onChange={(e) => handleNumberInput('q9_curricular_materials_request_count', e.target.value)}
                          className="w-32"
                          error={!!errors.q9_curricular_materials_request_count}
                        />
                      </FormField>
                    </div>
                  </div>

                  {/* Program Evaluation Questions */}
                  <div className="bg-amber-50 rounded-lg p-6 space-y-6">
                    <h4 className="text-lg font-semibold text-amber-900 border-b border-amber-200 pb-2">
                      Program Evaluation & Compliance
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField 
                        label="10. Number of home education programs deemed inappropriate by the evaluator (from the portfolio review)" 
                        required 
                        error={errors.q10_inappropriate_programs_count}
                      >
                        <Input
                          type="text"
                          value={formData.q10_inappropriate_programs_count.toString()}
                          onChange={(e) => handleNumberInput('q10_inappropriate_programs_count', e.target.value)}
                          className="w-32"
                          error={!!errors.q10_inappropriate_programs_count}
                        />
                      </FormField>

                      <FormField 
                        label="11. Number of hearings held regarding inappropriate home education programs" 
                        required 
                        error={errors.q11_inappropriate_program_hearings_count}
                      >
                        <Input
                          type="text"
                          value={formData.q11_inappropriate_program_hearings_count.toString()}
                          onChange={(e) => handleNumberInput('q11_inappropriate_program_hearings_count', e.target.value)}
                          className="w-32"
                          error={!!errors.q11_inappropriate_program_hearings_count}
                        />
                        <div className="text-xs text-gray-600 mt-1 bg-gray-50 px-2 py-1 rounded">
                          Inappropriate programs: {formData.q10_inappropriate_programs_count}
                        </div>
                      </FormField>
                    </div>
                  </div>

                  {/* Student Participation Questions */}
                  <div className="bg-green-50 rounded-lg p-6 space-y-6">
                    <h4 className="text-lg font-semibold text-green-900 border-b border-green-200 pb-2">
                      Student Participation in District Programs
                    </h4>
                    <div className="text-sm text-green-800 mb-4 bg-green-100 p-3 rounded">
                      <strong>Note:</strong> All questions below refer to homeschooled students from question 4 who participated during the school year.
                    </div>
                    
                    <div className="space-y-6">
                      <FormField 
                        label="12. Number of homeschooled students who participated in CTC or district-run career and technical education programs" 
                        required 
                        error={errors.q12_ctc_student_count}
                      >
                        <Input
                          type="text"
                          value={formData.q12_ctc_student_count.toString()}
                          onChange={(e) => handleNumberInput('q12_ctc_student_count', e.target.value)}
                          className="w-32"
                          error={!!errors.q12_ctc_student_count}
                        />
                      </FormField>

                      <FormField 
                        label="13. Number of homeschooled students who participated in cocurricular programs" 
                        required 
                        error={errors.q13_cocurricular_student_count}
                      >
                        <div className="text-sm text-gray-600 mb-2">
                          Programs that combine curricular and extracurricular activities such as band, art, or theater where the student participates in an extracurricular activity as a grade.
                        </div>
                        <Input
                          type="text"
                          value={formData.q13_cocurricular_student_count.toString()}
                          onChange={(e) => handleNumberInput('q13_cocurricular_student_count', e.target.value)}
                          className="w-32"
                          error={!!errors.q13_cocurricular_student_count}
                        />
                      </FormField>

                      <FormField 
                        label="14. Number of homeschooled students who participated in academic programs" 
                        required 
                        error={errors.q14_academic_program_student_count}
                      >
                        <Input
                          type="text"
                          value={formData.q14_academic_program_student_count.toString()}
                          onChange={(e) => handleNumberInput('q14_academic_program_student_count', e.target.value)}
                          className="w-32"
                          error={!!errors.q14_academic_program_student_count}
                        />
                      </FormField>

                      <FormField 
                        label="15. Total number of homeschooled students who participated in ANY program" 
                        required 
                        error={errors.q15_any_program_student_count}
                      >
                        <Input
                          type="text"
                          value={formData.q15_any_program_student_count.toString()}
                          onChange={(e) => handleNumberInput('q15_any_program_student_count', e.target.value)}
                          className="w-32"
                          error={!!errors.q15_any_program_student_count}
                        />
                        <div className="text-xs text-gray-600 mt-1 bg-gray-50 px-2 py-1 rounded">
                          Largest individual count: {Math.max(formData.q12_ctc_student_count, formData.q13_cocurricular_student_count, formData.q14_academic_program_student_count)}
                        </div>
                      </FormField>
                    </div>
                  </div>
                </>
              )}

              {/* Calculated Totals */}
              <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 space-y-2">
                <h3 className="font-semibold text-orange-900">Total of Privately Tutored and Homeschooled Students</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Total:</span>
                    <span className="ml-2 font-bold text-orange-700 text-lg">{totalTutoredAndHomeschooled}</span>
                  </div>
                </div>
              </div>
            </div>
          </FormSection>

          {/* Cyber Program */}
          <FormSection title="Cyber Program">
            <div className="space-y-6">
              {/* Cyber Program Availability */}
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
                    onChange={(value) => handleInputChange('q16_has_cyber_program', value)}
                    options={[
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No' }
                    ]}
                    error={!!errors.q16_has_cyber_program}
                  />
                </FormField>
              </div>

              {/* Grade Level Offerings */}
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
                      onChange={(grades) => handleInputChange('q17_cyber_grades_offered', grades)}
                      disabled={formData.q16_has_cyber_program !== 'yes'}
                    />
                  </FormField>
                </div>
              )}
            </div>
          </FormSection>

          {/* Additional Comments */}
          <FormSection title="Additional Comments">
            <div className="bg-gray-50 rounded-lg p-6 space-y-6">
              <FormField label="18. Comments (optional): (Please limit response to 250 characters.)" error={errors.q18_comments}>
                <Textarea
                  value={formData.q18_comments}
                  onChange={(e) => handleInputChange('q18_comments', e.target.value)}
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
          </FormSection>

          {/* Submit Button */}
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5" />
              Generate & Download CSV
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
