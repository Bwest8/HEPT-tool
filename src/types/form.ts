export interface FormData {
  // District Information
  district_name: string;
  district_aun: string;
  school_year: string;
  contact_name: string;
  phone_number: string;
  phone_extension: string;
  email_address: string;

  // Private Tutoring
  q1_private_tutoring_exists: 'yes' | 'no' | '';
  q2_private_tutoring_student_count: number;

  // Homeschooling - Main Data
  q3_homeschooling_exists: 'yes' | 'no' | '';
  q5_affidavits_rejected: number;
  q6_affidavit_return_reasons: string;
  q7_special_ed_student_count: number;
  q8_special_ed_services_student_count: number;
  q9_curricular_materials_request_count: number;
  q10_inappropriate_programs_count: number;
  q11_inappropriate_program_hearings_count: number;
  q12_ctc_student_count: number;
  q13_cocurricular_student_count: number;
  q14_academic_program_student_count: number;
  q15_any_program_student_count: number;

  // Student Enrollment Grid (Q4)
  q4_enrollments: Record<string, number>;

  // Cyber Program
  q16_has_cyber_program: 'yes' | 'no' | '';
  q17_cyber_grades_offered: string[];
  q18_comments: string;
}

export interface ValidationErrors {
  [key: string]: string;
}