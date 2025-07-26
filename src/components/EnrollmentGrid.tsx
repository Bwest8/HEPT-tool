import React from 'react';
import { Input } from './Input';
import { isValidNumber } from '../utils/validation';

interface EnrollmentGridProps {
  enrollments: Record<string, number>;
  onChange: (enrollments: Record<string, number>) => void;
  disabled?: boolean;
}

export const EnrollmentGrid: React.FC<EnrollmentGridProps> = ({ enrollments, onChange, disabled }) => {
  const ages = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]; // Ages 5-21

  const handleInputChange = (age: number, gender: 'males' | 'females', value: string) => {
    if (!isValidNumber(value)) return;
    
    const key = `q4_age${age}_${gender}`;
    onChange({
      ...enrollments,
      [key]: value === '' ? 0 : parseInt(value, 10)
    });
  };

  const calculateTotals = () => {
    const totals = {
      males: 0,
      females: 0,
      byAge: {} as Record<number, number>
    };

    ages.forEach(age => {
      const males = enrollments[`q4_age${age}_males`] || 0;
      const females = enrollments[`q4_age${age}_females`] || 0;
      totals.males += males;
      totals.females += females;
      totals.byAge[age] = males + females;
    });

    return totals;
  };

  const totals = calculateTotals();
  const grandTotal = totals.males + totals.females;

  if (disabled) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
        This section will be enabled when you select "Yes" for homeschooling question above.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-700 mb-2">
        Students Enrolled in Homeschooling at the End of the School Year
      </div>
      <div className="w-full">
        <table className="w-full bg-white border-2 border-gray-800 table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-16 px-1 py-2 text-center text-xs font-bold text-gray-900 border border-gray-800">Age</th>
              {ages.map(age => (
                <th key={age} className="px-1 py-2 text-center text-xs font-bold text-gray-900 border border-gray-800">
                  {age}
                </th>
              ))}
              <th className="w-12 px-1 py-2 text-center text-xs font-bold text-gray-900 border border-gray-800">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="px-1 py-1 text-xs font-bold text-gray-900 border border-gray-800">Males</td>
              {ages.map(age => (
                <td key={age} className="px-0.5 py-1 border border-gray-800">
                  <Input
                    type="text"
                    value={enrollments[`q4_age${age}_males`]?.toString() || ''}
                    onChange={(e) => handleInputChange(age, 'males', e.target.value)}
                    className="w-full text-center text-xs border-0 p-1 focus:ring-1 focus:ring-blue-500 min-h-[28px]"
                    placeholder="0"
                    maxLength={3}
                  />
                </td>
              ))}
              <td className="px-1 py-2 text-center text-xs font-bold text-gray-900 border border-gray-800 bg-gray-50">
                {totals.males}
              </td>
            </tr>
            <tr className="bg-white">
              <td className="px-1 py-1 text-xs font-bold text-gray-900 border border-gray-800">Females</td>
              {ages.map(age => (
                <td key={age} className="px-0.5 py-1 border border-gray-800">
                  <Input
                    type="text"
                    value={enrollments[`q4_age${age}_females`]?.toString() || ''}
                    onChange={(e) => handleInputChange(age, 'females', e.target.value)}
                    className="w-full text-center text-xs border-0 p-1 focus:ring-1 focus:ring-blue-500 min-h-[28px]"
                    placeholder="0"
                    maxLength={3}
                  />
                </td>
              ))}
              <td className="px-1 py-2 text-center text-xs font-bold text-gray-900 border border-gray-800 bg-gray-50">
                {totals.females}
              </td>
            </tr>
            <tr className="bg-gray-100">
              <td className="px-1 py-2 text-xs font-bold text-gray-900 border border-gray-800">Total</td>
              {ages.map(age => (
                <td key={age} className="px-1 py-2 text-center text-xs font-bold text-gray-900 border border-gray-800">
                  {totals.byAge[age] || 0}
                </td>
              ))}
              <td className="px-1 py-2 text-center text-xs font-bold text-blue-900 border border-gray-800 bg-blue-100">
                {grandTotal}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};