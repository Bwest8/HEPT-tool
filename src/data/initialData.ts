import { FormData } from '../types/form';

/**
 * Initial form data structure with default values
 * Provides the starting state for all form fields
 */
export const initialFormData: FormData = {
    // === District Information ===
    district_name: '',
    district_aun: '',
    school_year: '',
    contact_name: '',
    phone_number: '',
    phone_extension: '',
    email_address: '',

    // === Private Tutoring ===
    q1_private_tutoring_exists: '',
    q2_private_tutoring_student_count: 0,

    // === Homeschooling ===
    q3_homeschooling_exists: '',
    q5_affidavits_rejected: 0,
    q6_affidavit_return_reasons: '',
    q7_special_ed_student_count: 0,
    q8_special_ed_services_student_count: 0,
    q9_curricular_materials_request_count: 0,
    q10_inappropriate_programs_count: 0,
    q11_inappropriate_program_hearings_count: 0,
    q12_ctc_student_count: 0,
    q13_cocurricular_student_count: 0,
    q14_academic_program_student_count: 0,
    q15_any_program_student_count: 0,

    // === Student Enrollment Grid ===
    q4_enrollments: {},

    // === Cyber Program ===
    q16_has_cyber_program: '',
    q17_cyber_grades_offered: [],

    // === Additional Comments ===
    q18_comments: '',
};
