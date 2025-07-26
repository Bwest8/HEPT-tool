import React from 'react';

interface CyberProgramGridProps {
  selectedGrades: string[];
  onChange: (grades: string[]) => void;
  disabled?: boolean;
}

export const CyberProgramGrid: React.FC<CyberProgramGridProps> = ({ selectedGrades, onChange, disabled }) => {
  const grades = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  const handleGradeToggle = (grade: string) => {
    if (disabled) return;
    
    if (selectedGrades.includes(grade)) {
      onChange(selectedGrades.filter(g => g !== grade));
    } else {
      onChange([...selectedGrades, grade]);
    }
  };

  if (disabled) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
        This section will be enabled when you select "Yes" for cyber program question above.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-700 mb-2">
        If your answer to question 16 is yes, for each grade below, indicate whether the program is offered to students in that grade, even if no students in that grade participated in the reporting school year.
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-2 border-gray-800">
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
                      className="w-4 h-4 text-blue-600 focus:ring-blue-200 rounded"
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