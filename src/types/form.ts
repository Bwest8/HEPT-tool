/**
 * Form data interface representing all fields in the annual report form
 * Includes district information, private tutoring, homeschooling, and cyber program data
 */
export interface FormData {
  // === District Information ===
  /** Name of the school district */
  district_name: string;
  /** Administrative Unit Number - 9-digit district identifier */
  district_aun: string;
  /** School year in format "YYYY-YYYY" */
  school_year: string;
  /** Contact person name */
  contact_name: string;
  /** Contact phone number in format "(XXX) XXX-XXXX" */
  phone_number: string;
  /** Phone extension (optional) */
  phone_extension: string;
  /** Contact email address */
  email_address: string;

  // === Private Tutoring ===
  /** Question 1: Does district have private tutoring students? */
  q1_private_tutoring_exists: 'yes' | 'no' | '';
  /** Question 2: Number of private tutoring students */
  q2_private_tutoring_student_count: number;

  // === Homeschooling - Main Data ===
  /** Question 3: Does district have home educated students? */
  q3_homeschooling_exists: 'yes' | 'no' | '';
  /** Question 5: Number of affidavits rejected and returned */
  q5_affidavits_rejected: number;
  /** Question 6: Specific reasons for returning affidavits */
  q6_affidavit_return_reasons: string;
  /** Question 7: Number of special education homeschooled students */
  q7_special_ed_student_count: number;
  /** Question 8: Number of students receiving special education services */
  q8_special_ed_services_student_count: number;
  /** Question 9: Number of supervisors requesting curricular materials */
  q9_curricular_materials_request_count: number;
  /** Question 10: Number of inappropriate home education programs */
  q10_inappropriate_programs_count: number;
  /** Question 11: Number of hearings held for inappropriate programs */
  q11_inappropriate_program_hearings_count: number;
  /** Question 12: Number of homeschooled students in CTC programs */
  q12_ctc_student_count: number;
  /** Question 13: Number of homeschooled students in cocurricular programs */
  q13_cocurricular_student_count: number;
  /** Question 14: Number of homeschooled students in academic programs */
  q14_academic_program_student_count: number;
  /** Question 15: Total number of homeschooled students in ANY program */
  q15_any_program_student_count: number;

  // === Student Enrollment Grid (Q4) ===
  /** Question 4: Enrollment data by age and gender - key format: "q4_age{age}_{gender}" */
  q4_enrollments: Record<string, number>;

  // === Cyber Program ===
  /** Question 16: Does district have a cyber program? */
  q16_has_cyber_program: 'yes' | 'no' | '';
  /** Question 17: Grades offered in cyber program */
  q17_cyber_grades_offered: string[];

  // === Additional Comments ===
  /** Question 18: Optional comments */
  q18_comments: string;
}

/**
 * Validation errors interface for form validation
 * Maps field names to error messages
 */
export interface ValidationErrors {
  /** Error messages keyed by field name */
  [key: string]: string;
}
