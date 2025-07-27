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
    <div className="flex justify-center gap-4">
      {/* === CSV Export Button === */}
      <button
        type="button"
        onClick={onExportCSV}
        className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        <Download className="w-5 h-5" />
        Generate & Download CSV
      </button>
    </div>
  );
};
