import React from 'react';

// === Type Imports ===
import { FormData } from '../types/form';

/**
 * Props interface for TotalSummary component
 */
interface TotalSummaryProps {
  /** Form data object containing all form values */
  formData: FormData;
}

/**
 * Total Summary component
 * Displays the calculated total of privately tutored and homeschooled students
 */
export const TotalSummary: React.FC<TotalSummaryProps> = ({ formData }) => {
  // Calculate total homeschooled students from enrollment grid
  const q4Total = Object.values(formData.q4_enrollments).reduce((sum, val) => sum + (val || 0), 0);
  
  // Calculate total of tutored and homeschooled students
  const totalTutoredAndHomeschooled = formData.q2_private_tutoring_student_count + q4Total;

  return (
    <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 space-y-2">
      <h3 className="font-semibold text-orange-900">Total of Privately Tutored and Homeschooled Students</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium text-gray-700">Total:</span>
          <span className="ml-2 font-bold text-orange-700 text-lg">{totalTutoredAndHomeschooled}</span>
        </div>
      </div>
    </div>
  );
};
