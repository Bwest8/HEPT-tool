export interface SchoolYearOption {
    value: string;
    label: string;
}

/**
 * Generates school year options showing current and 4 previous years
 * @param currentDate - Optional date to use as current date (for testing)
 * @returns Array of school year options in format "YYYY-YYYY"
 */
export const generateSchoolYearOptions = (currentDate?: Date): SchoolYearOption[] => {
    const now = currentDate || new Date();
    const currentYear = now.getFullYear();

    return Array.from({ length: 5 }, (_, i) => {
        const year = currentYear - i;
        return {
            value: `${year}-${year + 1}`,
            label: `${year}-${year + 1}`,
        };
    });
};

/**
 * Calculates the reporting date (June 30th of the second year) for a given school year
 * @param schoolYear - School year in format "YYYY-YYYY"
 * @returns Reporting date in format "YYYY-06-30"
 */
export const calculateReportingDate = (schoolYear: string): string => {
    if (!schoolYear || !schoolYear.includes('-')) {
        throw new Error('Invalid school year format. Expected "YYYY-YYYY"');
    }

    const parts = schoolYear.split('-');
    if (parts.length !== 2) {
        throw new Error('Invalid school year format. Expected "YYYY-YYYY"');
    }

    const [startYear, endYear] = parts;

    if (!startYear || !endYear || isNaN(parseInt(startYear)) || isNaN(parseInt(endYear))) {
        throw new Error('Invalid school year format. Expected "YYYY-YYYY"');
    }

    return `${endYear}-06-30`;
};

/**
 * Validates that a school year string is in the correct format
 * @param schoolYear - School year string to validate
 * @returns true if valid, false otherwise
 */
export const isValidSchoolYear = (schoolYear: string): boolean => {
    if (!schoolYear) return false;

    const schoolYearPattern = /^\d{4}-\d{4}$/;
    if (!schoolYearPattern.test(schoolYear)) return false;

    const [startYear, endYear] = schoolYear.split('-').map(Number);

    // End year should be exactly one year after start year
    return endYear === startYear + 1;
};