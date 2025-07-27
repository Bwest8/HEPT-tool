import React from 'react';

// === Component Imports ===
import { FormField } from './FormField';
import { Input } from './Input';
import { Select } from './Select';
import { DistrictSelect } from './DistrictSelect';

// === Type Imports ===
import { FormData, ValidationErrors } from '../types/form';

/**
 * Props interface for DistrictInformation component
 */
interface DistrictInformationProps {
  /** Form data object containing all form values */
  formData: FormData;
  /** Validation errors object */
  errors: ValidationErrors;
  /** Available school year options for dropdown */
  schoolYearOptions: { value: string; label: string }[];
  /** Handler for district selection changes */
  onDistrictChange: (districtName: string, aun: string) => void;
  /** Handler for general input changes */
  onInputChange: (field: keyof FormData, value: any) => void;
  /** Handler for phone number input with formatting */
  onPhoneChange: (value: string) => void;
}

/**
 * District Information section of the form
 * Handles district selection, reporting period, and contact information
 */
export const DistrictInformation: React.FC<DistrictInformationProps> = ({
  formData,
  errors,
  schoolYearOptions,
  onDistrictChange,
  onInputChange,
  onPhoneChange
}) => {
  return (
    <div className="space-y-6">
      {/* === District Selection Section === */}
      <div className="bg-indigo-50 rounded-lg p-6 space-y-6">
        <h4 className="text-lg font-semibold text-indigo-900 border-b border-indigo-200 pb-2">
          District Selection
        </h4>
        
        <FormField label="District Name" required error={errors.district_name}>
          <DistrictSelect
            value={formData.district_name}
            onChange={onDistrictChange}
            error={!!errors.district_name}
          />
        </FormField>
        
        {/* Hidden input for district AUN */}
        <input
          type="hidden"
          value={formData.district_aun}
          name="district_aun"
        />
      </div>

      {/* === Reporting Period Section === */}
      <div className="bg-orange-50 rounded-lg p-6 space-y-6">
        <h4 className="text-lg font-semibold text-orange-900 border-b border-orange-200 pb-2">
          Reporting Period
        </h4>
        
        <div className="text-sm text-orange-800 mb-4 bg-orange-100 p-3 rounded">
          <strong>Important:</strong> Select the school year for which you are reporting data.
        </div>
        
        <FormField label="School Year" required error={errors.school_year}>
          <div className="max-w-sm">
            <Select
              value={formData.school_year}
              onChange={(e) => onInputChange('school_year', e.target.value)}
              options={schoolYearOptions}
              error={!!errors.school_year}
            />
          </div>
        </FormField>
      </div>

      {/* === Contact Information Section === */}
      <div className="bg-purple-50 rounded-lg p-6 space-y-6">
        <h4 className="text-lg font-semibold text-purple-900 border-b border-purple-200 pb-2">
          Contact Information
        </h4>
        
        <div className="text-sm text-purple-800 mb-4 bg-purple-100 p-3 rounded">
          <strong>Note:</strong> This contact person will be responsible for this report.
        </div>
        
        {/* Contact Name and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Contact Name" required error={errors.contact_name}>
            <Input
              type="text"
              value={formData.contact_name}
              onChange={(e) => onInputChange('contact_name', e.target.value)}
              placeholder="Enter full name"
              error={!!errors.contact_name}
            />
          </FormField>

          <FormField label="Email Address" required error={errors.email_address}>
            <Input
              type="email"
              value={formData.email_address}
              onChange={(e) => onInputChange('email_address', e.target.value)}
              placeholder="contact@district.edu"
              error={!!errors.email_address}
            />
          </FormField>
        </div>

        {/* Phone Number with Extension */}
        <FormField label="Phone Number" required error={errors.phone_number}>
          <div className="flex gap-1 max-w-sm">
            <Input
              type="text"
              value={formData.phone_number}
              onChange={(e) => onPhoneChange(e.target.value)}
              placeholder="(555) 123-4567"
              maxLength={14}
              error={!!errors.phone_number}
            />
            <span className="flex items-center px-2 text-sm text-gray-500">Ext.</span>
            <Input
              type="text"
              value={formData.phone_extension}
              onChange={(e) => onInputChange('phone_extension', e.target.value)}
              placeholder="1234"
              className="w-18"
              maxLength={6}
              error={!!errors.phone_extension}
            />
          </div>
        </FormField>
      </div>
    </div>
  );
};
