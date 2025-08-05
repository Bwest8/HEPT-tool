import { describe, it, expect } from 'vitest';
import { generateCSVData, type CSVRow } from '../csvExport';
import { type FormData } from '../../types/form';

// Helper: find a row by categories and measure type
function findRow(rows: CSVRow[], c1: string, c2: string, c3 = '', measure?: string) {
    return rows.find(r => r.CATEGORY_01 === c1 && r.CATEGORY_02 === c2 && r.CATEGORY_03 === c3 && (measure ? r.PRIMARY_MEASURE_TYPE === measure : true));
}

// Build Q4 enrollments map helper
function buildEnrollments(getVal: (age: number, gender: 'males' | 'females') => number): Record<string, number> {
    const entries: Array<[string, number]> = [];
    for (let age = 5; age <= 21; age++) {
        entries.push([`q4_age${age}_males`, getVal(age, 'males')]);
        entries.push([`q4_age${age}_females`, getVal(age, 'females')]);
    }
    return Object.fromEntries(entries);
}

// Minimal fixtures
const baseForm: FormData = {
    district_name: 'Sample SD',
    district_aun: '123456789',
    school_year: '2024-2025',
    contact_name: '',
    phone_number: '',
    phone_extension: '',
    email_address: '',
    q1_private_tutoring_exists: 'no',
    q2_private_tutoring_student_count: 0,
    q3_homeschooling_exists: 'no',
    q4_enrollments: buildEnrollments(() => 0),
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
    q16_has_cyber_program: 'no',
    q17_cyber_grades_offered: [],
    q18_comments: ''
};

const populatedForm: FormData = {
    ...baseForm,
    district_name: 'Populated SD',
    contact_name: 'Jane Doe',
    phone_number: '555-123-4567',
    phone_extension: '89',
    email_address: 'jane@example.com',
    q1_private_tutoring_exists: 'yes',
    q2_private_tutoring_student_count: 12,
    q3_homeschooling_exists: 'yes',
    q4_enrollments: buildEnrollments((age, gender) => (gender === 'males' ? age % 2 : (age + 1) % 2)),
    q5_affidavits_rejected: 3,
    q6_affidavit_return_reasons: 'Missing signatures',
    q7_special_ed_student_count: 4,
    q8_special_ed_services_student_count: 2,
    q9_curricular_materials_request_count: 5,
    q10_inappropriate_programs_count: 1,
    q11_inappropriate_program_hearings_count: 1,
    q12_ctc_student_count: 6,
    q13_cocurricular_student_count: 7,
    q14_academic_program_student_count: 8,
    q15_any_program_student_count: 10,
    q16_has_cyber_program: 'yes',
    q17_cyber_grades_offered: ['K', '1', '3', '5', '8', '12'],
    q18_comments: 'All set.'
};

const mixedForm: FormData = {
    ...baseForm,
    district_name: 'Mixed SD',
    contact_name: 'John Smith',
    phone_number: '555-000-1111',
    phone_extension: '',
    email_address: 'john@school.org',
    q1_private_tutoring_exists: 'yes',
    q2_private_tutoring_student_count: 2,
    q3_homeschooling_exists: 'no',
    q4_enrollments: baseForm.q4_enrollments,
    q16_has_cyber_program: 'yes',
    q17_cyber_grades_offered: ['9', '10', '11', '12']
};

describe('generateCSVData - end to end rows', () => {
    it('produces all expected rows with defaults for a minimal district', () => {
        const rows = generateCSVData(baseForm);

        // Contact rows
        expect(findRow(rows, 'HOME EDUCATION', 'CONTACT NAME')?.INDICATOR).toBe('Yes');
        expect(findRow(rows, 'HOME EDUCATION', 'PHONE NUMBER')?.INDICATOR).toBe('Yes');

        // Extension: No and blank comment
        const ext = findRow(rows, 'HOME EDUCATION', 'EXTENSION');
        expect(ext?.PRIMARY_MEASURE_TYPE).toBe('INDICATOR');
        expect(ext?.INDICATOR).toBe('No');
        expect(ext?.COMMENT).toBe('');

        // Email row present (indicator Yes with possibly blank comment allowed)
        expect(findRow(rows, 'HOME EDUCATION', 'EMAIL')?.PRIMARY_MEASURE_TYPE).toBe('INDICATOR');

        // Private tutoring students indicator No
        expect(findRow(rows, 'PRIVATE TUTORING', 'STUDENTS')?.INDICATOR).toBe('No');
        // TOTAL always present, default 0
        expect(findRow(rows, 'PRIVATE TUTORING', 'TOTAL', '', 'COUNT')?.COUNT).toBe('0');

        // Homeschooling indicator No
        expect(findRow(rows, 'HOME EDUCATION', 'STUDENTS')?.INDICATOR).toBe('No');

        // Enrollment 5–21 for both genders = 34 rows, all zeros
        const maleAges = Array.from({ length: 17 }, (_, i) => i + 5).map(age => findRow(rows, 'HOME EDUCATION', 'MALE', String(age), 'COUNT')?.COUNT);
        const femaleAges = Array.from({ length: 17 }, (_, i) => i + 5).map(age => findRow(rows, 'HOME EDUCATION', 'FEMALE', String(age), 'COUNT')?.COUNT);
        expect(maleAges.every(v => v === '0')).toBe(true);
        expect(femaleAges.every(v => v === '0')).toBe(true);

        // Affidavits returned = 0 and reason indicator No/blank
        expect(findRow(rows, 'HOME EDUCATION', 'AFFIDAVITS', 'RETURNED', 'COUNT')?.COUNT).toBe('0');
        const reason = findRow(rows, 'HOME EDUCATION', 'AFFIDAVITS REASON');
        expect(reason?.INDICATOR).toBe('No');
        expect(reason?.COMMENT).toBe('');

        // Other counts default to 0
        expect(findRow(rows, 'HOME EDUCATION', 'SPECIAL EDUCATION', 'STUDENTS', 'COUNT')?.COUNT).toBe('0');
        expect(findRow(rows, 'HOME EDUCATION', 'SPECIAL EDUCATION', 'SERVICES', 'COUNT')?.COUNT).toBe('0');

        // Cyber program district No and all grades K–12 present with No
        expect(findRow(rows, 'HOME EDUCATION', 'CYBER PROGRAM', 'DISTRICT')?.INDICATOR).toBe('No');
        const grades = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        grades.forEach(g => {
            const row = findRow(rows, 'HOME EDUCATION', 'CYBER PROGRAM', g);
            expect(row?.PRIMARY_MEASURE_TYPE).toBe('INDICATOR');
            expect(row?.INDICATOR).toBe('No');
            expect(row?.CATEGORY_04).toBe('GRADE');
        });

        // Comments indicator No/blank
        const comments = findRow(rows, 'HOME EDUCATION', 'COMMENTS');
        expect(comments?.INDICATOR).toBe('No');
        expect(comments?.COMMENT).toBe('');
    });

    it('produces fully populated rows when data provided', () => {
        const rows = generateCSVData(populatedForm);

        // Contact and extension
        expect(findRow(rows, 'HOME EDUCATION', 'CONTACT NAME')?.COMMENT).toBe('Jane Doe');
        const ext = findRow(rows, 'HOME EDUCATION', 'EXTENSION');
        expect(ext?.INDICATOR).toBe('Yes');
        expect(ext?.COMMENT).toBe('89');

        // Private tutoring Yes and count
        expect(findRow(rows, 'PRIVATE TUTORING', 'STUDENTS')?.INDICATOR).toBe('Yes');
        expect(findRow(rows, 'PRIVATE TUTORING', 'TOTAL', '', 'COUNT')?.COUNT).toBe('12');

        // Homeschooling Yes
        expect(findRow(rows, 'HOME EDUCATION', 'STUDENTS')?.INDICATOR).toBe('Yes');

        // Enrollment mixed values and present
        const anyMale = findRow(rows, 'HOME EDUCATION', 'MALE', '5', 'COUNT');
        expect(anyMale).toBeTruthy();

        // Affidavits returned and reason present
        expect(findRow(rows, 'HOME EDUCATION', 'AFFIDAVITS', 'RETURNED', 'COUNT')?.COUNT).toBe('3');
        const reason = findRow(rows, 'HOME EDUCATION', 'AFFIDAVITS REASON');
        expect(reason?.INDICATOR).toBe('Yes');
        expect(reason?.COMMENT).toBe('Missing signatures');

        // Cybers
        expect(findRow(rows, 'HOME EDUCATION', 'CYBER PROGRAM', 'DISTRICT')?.INDICATOR).toBe('Yes');
        const offered = ['K', '1', '3', '5', '8', '12'];
        const notOffered = ['2', '4', '6', '7', '9', '10', '11'];
        offered.forEach(g => expect(findRow(rows, 'HOME EDUCATION', 'CYBER PROGRAM', g)?.INDICATOR).toBe('Yes'));
        notOffered.forEach(g => expect(findRow(rows, 'HOME EDUCATION', 'CYBER PROGRAM', g)?.INDICATOR).toBe('No'));

        // Comments
        expect(findRow(rows, 'HOME EDUCATION', 'COMMENTS')?.INDICATOR).toBe('Yes');
    });

    it('supports mixed scenarios', () => {
        const rows = generateCSVData(mixedForm);

        // Tutoring Yes with count, Homeschooling No
        expect(findRow(rows, 'PRIVATE TUTORING', 'STUDENTS')?.INDICATOR).toBe('Yes');
        expect(findRow(rows, 'PRIVATE TUTORING', 'TOTAL', '', 'COUNT')?.COUNT).toBe('2');
        expect(findRow(rows, 'HOME EDUCATION', 'STUDENTS')?.INDICATOR).toBe('No');

        // Extension empty -> No/blank
        const ext = findRow(rows, 'HOME EDUCATION', 'EXTENSION');
        expect(ext?.INDICATOR).toBe('No');
        expect(ext?.COMMENT).toBe('');

        // Cyber district Yes and grades 9–12 Yes, others No
        expect(findRow(rows, 'HOME EDUCATION', 'CYBER PROGRAM', 'DISTRICT')?.INDICATOR).toBe('Yes');
        const yesGrades = ['9', '10', '11', '12'];
        const allGrades = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        allGrades.forEach(g => {
            const row = findRow(rows, 'HOME EDUCATION', 'CYBER PROGRAM', g);
            expect(row).toBeTruthy();
            expect(row?.INDICATOR).toBe(yesGrades.includes(g) ? 'Yes' : 'No');
        });
    });
});
