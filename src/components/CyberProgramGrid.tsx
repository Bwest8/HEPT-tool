import React from 'react';

/**
 * Props interface for CyberProgramGrid component
 */
interface CyberProgramGridProps {
  /** Currently selected grades that offer cyber programs */
  selectedGrades: string[];
  /** Handler for grade selection changes */
  onChange: (grades: string[]) => void;
  /** Whether the grid is disabled (e.g., when cyber program is not selected) */
  disabled?: boolean;
}

/**
 * Cyber Program Grid component for selecting which grades offer cyber programs
 * Displays a table grid for grades K-12 with checkboxes for selection
 */
export const CyberProgramGrid: React.FC<CyberProgramGridProps> = ({ selectedGrades, onChange, disabled }) => {
  // === Constants ===
  /** Grade levels for cyber program offerings (K-12) */
  const grades = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  // === Event Handlers ===
  /**
   * Handle grade selection toggle
   * @param grade - Grade level to toggle
   */
  const handleGradeToggle = (grade: string) => {
    if (disabled) return;
    
    if (selectedGrades.includes(grade)) {
      onChange(selectedGrades.filter(g => g !== grade));
    } else {
      onChange([...selectedGrades, grade]);
    }
  };

  // === Render ===
  // Show disabled state message
  if (disabled) {
    return (
      <div className="bg-gray-100 border-2 border-gray-300 p-4 text-base text-gray-600">
        <strong>Note:</strong> This section will be enabled when you select "Yes" for cyber program question above.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      
      
      <div className="overflow-x-auto">
        {/* === Grade Selection Table === */}
        <table className="min-w-full bg-white border-2 border-gray-800">
          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-2 text-center text-xs font-bold text-gray-900 border border-gray-800">Grade</th>
              {grades.map(grade => (
                <th key={grade} className="px-2 py-2 text-center text-xs font-bold text-gray-900 border border-gray-800 min-w-[50px]">
                  {grade}
                </th>
              ))}
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody>
            <tr className="bg-white">
              <td className="px-2 py-2 text-xs font-bold text-gray-900 border border-gray-800">Cyber Program</td>
              {grades.map(grade => (
                <td key={grade} className="px-2 py-2 text-center border border-gray-800">
                  <label className="flex justify-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedGrades.includes(grade)}
                      onChange={() => handleGradeToggle(grade)}
                      className="w-5 h-5 text-blue-600 border-2 border-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200"
                    />
                  </label>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
