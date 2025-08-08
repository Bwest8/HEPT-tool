import React, { useState, useEffect } from 'react';

// === Type Imports ===
import { FormData, ValidationErrors } from './types/form';

// === Utility Imports ===
import { validateForm, isValidNumber, formatPhoneNumber } from './utils/validation';
import { downloadCSV } from './utils/csvExport';
import { generateSchoolYearOptions } from './utils/schoolYear';

// === Data Imports ===
import { initialFormData } from './data/initialData';

// === Component Imports ===
import { Header } from './components/Header';
import { ImportantReminders } from './components/ImportantReminders';
import { FormMessages } from './components/FormMessages';
import { DistrictInformation } from './components/DistrictInformation';
import { PrivateTutoring } from './components/PrivateTutoring';
import { HomeschoolingSection } from './components/HomeschoolingSection';
import { CyberProgramSection } from './components/CyberProgramSection';
import { AdditionalComments } from './components/AdditionalComments';
import { TotalSummary } from './components/TotalSummary';
import { FormSubmit } from './components/FormSubmit';
import { FormSection } from './components/FormSection';

/**
 * Main application component for the Home Education and Private Tutoring Annual Report Form
 * This component manages the form state, validation, and handles user interactions
 */
function App() {
  // === State Management ===
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  // === Computed Values ===
  /** School year options for the dropdown (current year and 4 previous years) */
  const schoolYearOptions = generateSchoolYearOptions();

  // === Effects ===
  /** Re-validate form data whenever formData or submitted state changes */
  useEffect(() => {
    if (submitted) {
      setErrors(validateForm(formData));
    }
  }, [formData, submitted]);

  // === Event Handlers ===
  /**
   * Handle general input changes for form fields
   * @param field - The form field key to update
   * @param value - The new value for the field
   */
  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear success message when user makes changes
    if (successMessage) setSuccessMessage('');
  };

  /**
   * Handle district selection changes (updates both district name and AUN)
   * @param districtName - The selected district name
   * @param aun - The corresponding district AUN
   */
  const handleDistrictChange = (districtName: string, aun: string) => {
    setFormData(prev => ({ 
      ...prev, 
      district_name: districtName,
      district_aun: aun 
    }));
    // Clear success message when district changes
    if (successMessage) setSuccessMessage('');
  };

  /**
   * Handle phone number input with automatic formatting
   * @param value - The raw phone number input
   */
  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    handleInputChange('phone_number', formatted);
  };

  /**
   * Handle numeric input validation and conversion
   * @param field - The form field key to update
   * @param value - The string value from input
   */
  const handleNumberInput = (field: keyof FormData, value: string) => {
    if (!isValidNumber(value)) return;
    handleInputChange(field, value === '' ? 0 : parseInt(value, 10));
  };

  /**
   * Handle form submission (validation only, no actual server submission)
   * @param e - Form submit event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    setSubmitted(true);

    if (Object.keys(validationErrors).length === 0) {
      // Form is valid - show success message
      alert('Form submitted successfully!');
    }
  };

  /**
   * Handle CSV export functionality with validation
   * Validates form before export and provides user feedback
   */
  const handleExportCSV = () => {
    const validationErrors = validateForm(formData);
    
    // If validation fails, show errors and scroll to error summary
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
    
    // Export is valid - generate and download CSV
    const filename = downloadCSV(formData);
    setSuccessMessage(`Template "${filename}" generated and downloaded successfully!`);
    
    // Scroll to success message after state updates
    setTimeout(() => {
      const successMessageElement = document.getElementById('success-message');
      if (successMessageElement) {
        successMessageElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }, 100);
  };

  // === Render ===
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main content container */}
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-xl p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <ImportantReminders />
            
            <FormMessages 
              submitted={submitted}
              errors={errors}
              successMessage={successMessage}
            />

            {/* === Form Sections === */}
    <FormSection id="district-info" title="District Information">
              <DistrictInformation
                formData={formData}
                errors={errors}
                schoolYearOptions={schoolYearOptions}
                onDistrictChange={handleDistrictChange}
                onInputChange={handleInputChange}
                onPhoneChange={handlePhoneChange}
              />
            </FormSection>

    <FormSection id="private-tutoring" title="Private Tutoring">
              <PrivateTutoring
                formData={formData}
                errors={errors}
                onInputChange={handleInputChange}
                onNumberInput={handleNumberInput}
              />
            </FormSection>

    <FormSection id="homeschooling" title="Homeschooling">
              <HomeschoolingSection
                formData={formData}
                errors={errors}
                onInputChange={handleInputChange}
                onNumberInput={handleNumberInput}
              />
            </FormSection>

    <FormSection id="cyber-program" title="Cyber Program">
              <CyberProgramSection
                formData={formData}
                errors={errors}
                onInputChange={handleInputChange}
              />
            </FormSection>

    <FormSection id="additional-comments" title="Additional Comments">
              <AdditionalComments
                formData={formData}
                errors={errors}
                onInputChange={handleInputChange}
              />
            </FormSection>

            <TotalSummary formData={formData} />
            <FormSubmit onExportCSV={handleExportCSV} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
