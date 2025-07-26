import { FormData, ValidationErrors } from '../types/form';

export const validateForm = (data: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // District Information validation
  if (!data.district_name) {
    errors.district_name = 'District Name is required';
  }

  if (!data.district_aun) {
    errors.district_aun = 'District AUN is required';
  } else if (!/^\d{9}$/.test(data.district_aun)) {
    errors.district_aun = 'District AUN must be exactly 9 digits';
  }

  if (!data.school_year) {
    errors.school_year = 'School Year is required';
  }

  if (!data.contact_name.trim()) {
    errors.contact_name = 'Contact Name is required';
  } else if (data.contact_name.length < 2) {
    errors.contact_name = 'Contact Name must be at least 2 characters';
  } else if (!/^[a-zA-Z\s\-']+$/.test(data.contact_name)) {
    errors.contact_name = 'Contact Name should only contain letters, spaces, hyphens, or apostrophes';
  }

  if (!data.phone_number.trim()) {
    errors.phone_number = 'Phone Number is required';
  } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(data.phone_number)) {
    errors.phone_number = 'Phone number must be in format (XXX) XXX-XXXX';
  }

  if (data.phone_extension && !/^\d+$/.test(data.phone_extension)) {
    errors.phone_extension = 'Extension must be numeric';
  } else if (data.phone_extension && data.phone_extension.length > 6) {
    errors.phone_extension = 'Extension cannot exceed 6 digits';
  }

  if (!data.email_address.trim()) {
    errors.email_address = 'Email Address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email_address)) {
    errors.email_address = 'Please enter a valid email address';
  }

  // Private Tutoring validation
  if (!data.q1_private_tutoring_exists) {
    errors.q1_private_tutoring_exists = 'Please indicate whether the district had students in private tutoring';
  }

  if (data.q1_private_tutoring_exists === 'yes' && data.q2_private_tutoring_student_count <= 0) {
    errors.q2_private_tutoring_student_count = 'Please enter the number of private tutoring students (must be greater than 0)';
  }

  // Homeschooling validation
  if (!data.q3_homeschooling_exists) {
    errors.q3_homeschooling_exists = 'Please indicate whether the district had home educated students';
  }

  // Calculate total from Q4 grid
  const q4Total = Object.values(data.q4_enrollments).reduce((sum, val) => sum + (val || 0), 0);

  if (data.q3_homeschooling_exists === 'yes' && q4Total === 0) {
    errors.q4_enrollments = 'Please enter enrollment data in the grid - at least one student must be enrolled when homeschooling exists';
  }

  if (data.q5_affidavits_rejected < 0) {
    errors.q5_affidavits_rejected = 'Number of rejected affidavits must be 0 or greater';
  }

  if (data.q5_affidavits_rejected > 0 && !data.q6_affidavit_return_reasons.trim()) {
    errors.q6_affidavit_return_reasons = 'Please provide specific reasons for returning affidavits (Question 6)';
  }

  if (data.q6_affidavit_return_reasons.length > 250) {
    errors.q6_affidavit_return_reasons = 'Affidavit return reasons must be 250 characters or less';
  }

  if (data.q7_special_ed_student_count > q4Total) {
    errors.q7_special_ed_student_count = `Special education students (${data.q7_special_ed_student_count}) cannot exceed total homeschooled students (${q4Total})`;
  }

  if (data.q8_special_ed_services_student_count > data.q7_special_ed_student_count) {
    errors.q8_special_ed_services_student_count = `Students receiving services (${data.q8_special_ed_services_student_count}) cannot exceed special education students (${data.q7_special_ed_student_count})`;
  }

  if (data.q11_inappropriate_program_hearings_count > data.q10_inappropriate_programs_count) {
    errors.q11_inappropriate_program_hearings_count = `Hearings held (${data.q11_inappropriate_program_hearings_count}) cannot exceed inappropriate programs (${data.q10_inappropriate_programs_count})`;
  }

  if (data.q12_ctc_student_count > q4Total) {
    errors.q12_ctc_student_count = `CTC program participants (${data.q12_ctc_student_count}) cannot exceed total homeschooled students (${q4Total})`;
  }

  if (data.q13_cocurricular_student_count > q4Total) {
    errors.q13_cocurricular_student_count = `Cocurricular program participants (${data.q13_cocurricular_student_count}) cannot exceed total homeschooled students (${q4Total})`;
  }

  if (data.q14_academic_program_student_count > q4Total) {
    errors.q14_academic_program_student_count = `Academic program participants (${data.q14_academic_program_student_count}) cannot exceed total homeschooled students (${q4Total})`;
  }

  if (data.q15_any_program_student_count > q4Total) {
    errors.q15_any_program_student_count = `Total program participants (${data.q15_any_program_student_count}) cannot exceed total homeschooled students (${q4Total})`;
  }

  const programSum = data.q12_ctc_student_count + data.q13_cocurricular_student_count + data.q14_academic_program_student_count;
  if (data.q15_any_program_student_count > programSum) {
    errors.q15_any_program_student_count = `Total participants in ANY program (${data.q15_any_program_student_count}) cannot exceed the sum of individual programs (${programSum})`;
  }

  const maxIndividualProgram = Math.max(data.q12_ctc_student_count, data.q13_cocurricular_student_count, data.q14_academic_program_student_count);
  if (data.q15_any_program_student_count < maxIndividualProgram) {
    errors.q15_any_program_student_count = `Total participants in ANY program must be at least ${maxIndividualProgram} (the largest individual program count)`;
  }

  // Cyber Program validation
  if (!data.q16_has_cyber_program) {
    errors.q16_has_cyber_program = 'Please indicate whether the district has a cyber program';
  }

  // Additional numeric field validations for homeschooling questions
  if (data.q3_homeschooling_exists === 'yes') {
    if (data.q7_special_ed_student_count < 0) {
      errors.q7_special_ed_student_count = 'Number of special education students must be 0 or greater';
    }

    if (data.q8_special_ed_services_student_count < 0) {
      errors.q8_special_ed_services_student_count = 'Number of students receiving special education services must be 0 or greater';
    }

    if (data.q9_curricular_materials_request_count < 0) {
      errors.q9_curricular_materials_request_count = 'Number of supervisors requesting curricular materials must be 0 or greater';
    }

    if (data.q10_inappropriate_programs_count < 0) {
      errors.q10_inappropriate_programs_count = 'Number of inappropriate programs must be 0 or greater';
    }

    if (data.q11_inappropriate_program_hearings_count < 0) {
      errors.q11_inappropriate_program_hearings_count = 'Number of hearings held must be 0 or greater';
    }

    if (data.q12_ctc_student_count < 0) {
      errors.q12_ctc_student_count = 'Number of CTC program participants must be 0 or greater';
    }

    if (data.q13_cocurricular_student_count < 0) {
      errors.q13_cocurricular_student_count = 'Number of cocurricular program participants must be 0 or greater';
    }

    if (data.q14_academic_program_student_count < 0) {
      errors.q14_academic_program_student_count = 'Number of academic program participants must be 0 or greater';
    }

    if (data.q15_any_program_student_count < 0) {
      errors.q15_any_program_student_count = 'Total number of program participants must be 0 or greater';
    }
  }

  if (data.q18_comments.length > 250) {
    errors.q18_comments = 'Cyber program comments must be 250 characters or less';
  }

  return errors;
};

export const isValidNumber = (value: string): boolean => {
  return /^\d*$/.test(value);
};

export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '');

  // Format as (XXX) XXX-XXXX
  if (digits.length >= 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  } else if (digits.length >= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else if (digits.length >= 3) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  } else if (digits.length > 0) {
    return `(${digits}`;
  }

  return '';
};
