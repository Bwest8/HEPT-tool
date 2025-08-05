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
    <div className="bg-orange-50 border-2 border-orange-300 p-6 space-y-4">
      <h3 className="font-bold text-xl text-orange-900 border-b-2 border-orange-300 pb-2">
        Total of Privately Tutored and Homeschooled Students
      </h3>
      <div className="flex items-center gap-4">
        <span className="text-base font-bold text-gray-900">Grand Total:</span>
        <span className="bg-orange-100 border-2 border-orange-400 px-6 py-3 font-bold text-orange-900 text-2xl min-w-16 text-center">
          {totalTutoredAndHomeschooled}
        </span>
        <span className="text-sm text-gray-600">students</span>
      </div>
    </div>
  );
};
