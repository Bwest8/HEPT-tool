import React from 'react';

// === Icon Imports ===
import { Download } from 'lucide-react';

/**
 * Props interface for FormSubmit component
 */
interface FormSubmitProps {
  /** Handler for CSV export functionality */
  onExportCSV: () => void;
}

/**
 * Form submit section with CSV export button
 * Provides the main action button for generating and downloading the CSV report
 */
export const FormSubmit: React.FC<FormSubmitProps> = ({ onExportCSV }) => {
  return (
    <div className="flex justify-center pt-6 border-t border-gray-200">
      {/* === CSV Export Button === */}
      <button
        type="button"
        onClick={onExportCSV}
        className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 text-base font-bold rounded-none border-2 border-blue-600 hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 active:bg-blue-800 transition-all duration-200 min-w-64"
      >
        <Download className="w-5 h-5" aria-hidden="true" />
        Generate & Download CSV
      </button>
    </div>
  );
};
