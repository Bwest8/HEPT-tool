import { FormData } from '../types/form';
import { calculateReportingDate } from './schoolYear';

/**
 * Interface for CSV row data structure
 * Matches the PIMS District Fact template format
 */
export interface CSVRow {
  DISTRICT_CODE: string;
  REPORTING_DATE: string;
  CATEGORY_01: string;
  CATEGORY_02: string;
  CATEGORY_03: string;
  PRIMARY_MEASURE_TYPE: string;
  COUNT: string;
  AMOUNT: string;
  PERCENT: string;
  INDICATOR: string;
  CATEGORY_04: string;
  CATEGORY_05: string;
  CATEGORY_06: string;
  CATEGORY_07: string;
  CATEGORY_08: string;
  CATEGORY_09: string;
  CATEGORY_10: string;
  CATEGORY_11: string;
  START_DATE: string;
  END_DATE: string;
  COMMENT: string;
}

/**
 * Generate CSV data rows from form data
 * Converts the form data into the PIMS District Fact template format
 * 
 * @param formData - The form data to convert to CSV format
 * @returns Array of CSVRow objects ready for export
 */
export const generateCSVData = (formData: FormData): CSVRow[] => {
  const rows: CSVRow[] = [];

  // Calculate reporting date (June 30th of the second year in school year)
  const reportingDate = calculateReportingDate(formData.school_year);

  // Helper function to create a base row
  const createBaseRow = (): CSVRow => ({
    DISTRICT_CODE: formData.district_aun,
    REPORTING_DATE: reportingDate,
    CATEGORY_01: '',
    CATEGORY_02: '',
    CATEGORY_03: '',
    PRIMARY_MEASURE_TYPE: '',
    COUNT: '',
    AMOUNT: '',
    PERCENT: '',
    INDICATOR: '',
    CATEGORY_04: '',
    CATEGORY_05: '',
    CATEGORY_06: '',
    CATEGORY_07: '',
    CATEGORY_08: '',
    CATEGORY_09: '',
    CATEGORY_10: '',
    CATEGORY_11: '',
    START_DATE: '',
    END_DATE: '',
    COMMENT: ''
  });

  // === Contact Information ===
  rows.push({
    ...createBaseRow(),
    CATEGORY_01: 'HOME EDUCATION',
    CATEGORY_02: 'CONTACT NAME',
    PRIMARY_MEASURE_TYPE: 'INDICATOR',
    INDICATOR: 'Yes',
    COMMENT: formData.contact_name
  });

  rows.push({
    ...createBaseRow(),
    CATEGORY_01: 'HOME EDUCATION',
    CATEGORY_02: 'PHONE NUMBER',
    PRIMARY_MEASURE_TYPE: 'INDICATOR',
    INDICATOR: 'Yes',
    COMMENT: formData.phone_number
  });

  // Phone Extension (only if provided)
  if (formData.phone_extension) {
    rows.push({
      ...createBaseRow(),
      CATEGORY_01: 'HOME EDUCATION',
      CATEGORY_02: 'EXTENSION',
      PRIMARY_MEASURE_TYPE: 'INDICATOR',
      INDICATOR: 'Yes',
      COMMENT: formData.phone_extension
    });
  }

  rows.push({
    ...createBaseRow(),
    CATEGORY_01: 'HOME EDUCATION',
    CATEGORY_02: 'EMAIL',
    PRIMARY_MEASURE_TYPE: 'INDICATOR',
    INDICATOR: 'Yes',
    COMMENT: formData.email_address
  });

  // === Private Tutoring Data ===
  // Private Tutoring - Students
  rows.push({
    ...createBaseRow(),
    CATEGORY_01: 'PRIVATE TUTORING',
    CATEGORY_02: 'STUDENTS',
    PRIMARY_MEASURE_TYPE: 'INDICATOR',
    INDICATOR: formData.q1_private_tutoring_exists === 'yes' ? 'Yes' : 'No'
  });

  // Private Tutoring - Student Count
  if (formData.q1_private_tutoring_exists === 'yes') {
    rows.push({
      ...createBaseRow(),
      CATEGORY_01: 'PRIVATE TUTORING',
      CATEGORY_02: 'TOTAL',
      PRIMARY_MEASURE_TYPE: 'COUNT',
      COUNT: formData.q2_private_tutoring_student_count.toString()
    });
  }

  // === Home Education Data ===
  // Home Education - Students
  rows.push({
    ...createBaseRow(),
    CATEGORY_01: 'HOME EDUCATION',
    CATEGORY_02: 'STUDENTS',
    PRIMARY_MEASURE_TYPE: 'INDICATOR',
    INDICATOR: formData.q3_homeschooling_exists === 'yes' ? 'Yes' : 'No'
  });

  // Home Education - Enrollment by age and gender (include all ages, even zeros)
  for (let age = 5; age <= 21; age++) {
    const count = formData.q4_enrollments[`q4_age${age}_males`] || 0;
    rows.push({
      ...createBaseRow(),
      CATEGORY_01: 'HOME EDUCATION',
      CATEGORY_02: 'MALE',
      CATEGORY_03: age.toString(),
      PRIMARY_MEASURE_TYPE: 'COUNT',
      COUNT: count.toString(),
      CATEGORY_04: 'AGE'
    });
  }

  for (let age = 5; age <= 21; age++) {
    const count = formData.q4_enrollments[`q4_age${age}_females`] || 0;
    rows.push({
      ...createBaseRow(),
      CATEGORY_01: 'HOME EDUCATION',
      CATEGORY_02: 'FEMALE',
      CATEGORY_03: age.toString(),
      PRIMARY_MEASURE_TYPE: 'COUNT',
      COUNT: count.toString(),
      CATEGORY_04: 'AGE'
    });
  }

  // Home Education - Affidavits Returned
  rows.push({
    ...createBaseRow(),
    CATEGORY_01: 'HOME EDUCATION',
    CATEGORY_02: 'AFFIDAVITS',
    CATEGORY_03: 'RETURNED',
    PRIMARY_MEASURE_TYPE: 'COUNT',
    COUNT: formData.q5_affidavits_rejected.toString()
  });

  // Home Education - Affidavits Reason (only if there are rejected affidavits)
  if (formData.q5_affidavits_rejected > 0 && formData.q6_affidavit_return_reasons) {
    rows.push({
      ...createBaseRow(),
      CATEGORY_01: 'HOME EDUCATION',
      CATEGORY_02: 'AFFIDAVITS REASON',
      PRIMARY_MEASURE_TYPE: 'INDICATOR',
      INDICATOR: 'Yes',
      COMMENT: formData.q6_affidavit_return_reasons
    });
  }

  // Home Education - Special Education Students
  rows.push({
    ...createBaseRow(),
    CATEGORY_01: 'HOME EDUCATION',
    CATEGORY_02: 'SPECIAL EDUCATION',
    CATEGORY_03: 'STUDENTS',
    PRIMARY_MEASURE_TYPE: 'COUNT',
    COUNT: formData.q7_special_ed_student_count.toString()
  });

  // Home Education - Special Education Services
  rows.push({
    ...createBaseRow(),
    CATEGORY_01: 'HOME EDUCATION',
    CATEGORY_02: 'SPECIAL EDUCATION',
    CATEGORY_03: 'SERVICES',
    PRIMARY_MEASURE_TYPE: 'COUNT',
    COUNT: formData.q8_special_ed_services_student_count.toString()
  });

  // Home Education - Curricular Materials
  rows.push({
    ...createBaseRow(),
    CATEGORY_01: 'HOME EDUCATION',
    CATEGORY_02: 'CURRICULAR MATERIALS',
    CATEGORY_03: 'SUPERVISOR REQUESTS',
    PRIMARY_MEASURE_TYPE: 'COUNT',
    COUNT: formData.q9_curricular_materials_request_count.toString()
  });

  // Home Education - Programs Inappropriate
  rows.push({
    ...createBaseRow(),
    CATEGORY_01: 'HOME EDUCATION',
    CATEGORY_02: 'PROGRAMS',
    CATEGORY_03: 'INAPPROPRIATE',
    PRIMARY_MEASURE_TYPE: 'COUNT',
    COUNT: formData.q10_inappropriate_programs_count.toString()
  });

  // Home Education - Hearings Held Inappropriate
  rows.push({
    ...createBaseRow(),
    CATEGORY_01: 'HOME EDUCATION',
    CATEGORY_02: 'HEARINGS HELD',
    CATEGORY_03: 'INAPPROPRIATE',
    PRIMARY_MEASURE_TYPE: 'COUNT',
    COUNT: formData.q11_inappropriate_program_hearings_count.toString()
  });

  // Home Education - CTE Participants
  rows.push({
    ...createBaseRow(),
    CATEGORY_01: 'HOME EDUCATION',
    CATEGORY_02: 'CTE',
    CATEGORY_03: 'PARTICIPANTS',
    PRIMARY_MEASURE_TYPE: 'COUNT',
    COUNT: formData.q12_ctc_student_count.toString()
  });

  // Home Education - Cocurricular Participants
  rows.push({
    ...createBaseRow(),
    CATEGORY_01: 'HOME EDUCATION',
    CATEGORY_02: 'COCURRICULAR',
    CATEGORY_03: 'PARTICIPANTS',
    PRIMARY_MEASURE_TYPE: 'COUNT',
    COUNT: formData.q13_cocurricular_student_count.toString()
  });

  // Home Education - Academic Participants
  rows.push({
    ...createBaseRow(),
    CATEGORY_01: 'HOME EDUCATION',
    CATEGORY_02: 'ACADEMIC',
    CATEGORY_03: 'PARTICIPANTS',
    PRIMARY_MEASURE_TYPE: 'COUNT',
    COUNT: formData.q14_academic_program_student_count.toString()
  });

  // Home Education - District Program Participants
  rows.push({
    ...createBaseRow(),
    CATEGORY_01: 'HOME EDUCATION',
    CATEGORY_02: 'DIST_PROGRAM',
    CATEGORY_03: 'PARTICIPANTS',
    PRIMARY_MEASURE_TYPE: 'COUNT',
    COUNT: formData.q15_any_program_student_count.toString()
  });

  // === Cyber Program Data ===
  // Home Education - Cyber Program District
  rows.push({
    ...createBaseRow(),
    CATEGORY_01: 'HOME EDUCATION',
    CATEGORY_02: 'CYBER PROGRAM',
    CATEGORY_03: 'DISTRICT',
    PRIMARY_MEASURE_TYPE: 'INDICATOR',
    INDICATOR: formData.q16_has_cyber_program === 'yes' ? 'Yes' : 'No'
  });

  // Home Education - Cyber Program by Grade (K-12)
  const grades = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  grades.forEach(grade => {
    const isOffered = formData.q17_cyber_grades_offered.includes(grade);
    rows.push({
      ...createBaseRow(),
      CATEGORY_01: 'HOME EDUCATION',
      CATEGORY_02: 'CYBER PROGRAM',
      CATEGORY_03: grade,
      PRIMARY_MEASURE_TYPE: 'INDICATOR',
      INDICATOR: isOffered ? 'Yes' : 'No',
      CATEGORY_04: 'GRADE'
    });
  });

  // === Additional Comments ===
  // Aditional Comments - Comments (if any)
  if (formData.q18_comments) {
    rows.push({
      ...createBaseRow(),
      CATEGORY_01: 'HOME EDUCATION',
      CATEGORY_02: 'COMMENTS',
      PRIMARY_MEASURE_TYPE: 'INDICATOR',
      INDICATOR: 'Yes',
      COMMENT: formData.q18_comments
    });
  }

  return rows;
};

/**
 * Generate and download CSV file from form data
 * Creates a properly formatted CSV file for PIMS submission
 * 
 * @param formData - The form data to export
 * @returns The generated filename
 */
export const downloadCSV = (formData: FormData): string => {
  const csvData = generateCSVData(formData);

  // Generate filename with timestamp
  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:T]/g, '').slice(0, 12); // YYYYMMDDHHMM
  const filename = `${formData.district_aun}_DISTRICT_FACT_${timestamp}.csv`;

  // Create CSV headers
  const headers = [
    'DISTRICT CODE',
    'REPORTING DATE',
    'CATEGORY 01',
    'CATEGORY 02',
    'CATEGORY 03',
    'PRIMARY MEASURE TYPE',
    'COUNT',
    'AMOUNT',
    'PERCENT',
    'INDICATOR',
    'CATEGORY 04',
    'CATEGORY 05',
    'CATEGORY 06',
    'CATEGORY 07',
    'CATEGORY 08',
    'CATEGORY 09',
    'CATEGORY 10',
    'CATEGORY 11',
    'START DATE',
    'END DATE',
    'COMMENT'
  ];

  // Convert data to CSV format
  const csvContent = [
    headers.join(','),
    ...csvData.map(row => [
      `"${row.DISTRICT_CODE}"`,
      `"${row.REPORTING_DATE}"`,
      `"${row.CATEGORY_01}"`,
      `"${row.CATEGORY_02}"`,
      `"${row.CATEGORY_03}"`,
      `"${row.PRIMARY_MEASURE_TYPE}"`,
      `"${row.COUNT}"`,
      `"${row.AMOUNT}"`,
      `"${row.PERCENT}"`,
      `"${row.INDICATOR}"`,
      `"${row.CATEGORY_04}"`,
      `"${row.CATEGORY_05}"`,
      `"${row.CATEGORY_06}"`,
      `"${row.CATEGORY_07}"`,
      `"${row.CATEGORY_08}"`,
      `"${row.CATEGORY_09}"`,
      `"${row.CATEGORY_10}"`,
      `"${row.CATEGORY_11}"`,
      `"${row.START_DATE}"`,
      `"${row.END_DATE}"`,
      `"${row.COMMENT}"`
    ].join(','))
  ].join('\n');

  // Create and download the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return filename;
};
