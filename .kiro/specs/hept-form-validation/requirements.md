# Requirements Document

## Introduction

This specification validates the existing Home Education and Private Tutoring Annual Report Form web application against the detailed functional requirements provided. The form must collect district data, perform logical validation, and generate a CSV file for PIMS submission with specific formatting and naming conventions.

## Requirements

### Requirement 1: District Information Section

**User Story:** As a district administrator, I want to enter my district information accurately, so that the generated report is properly attributed and contains valid contact details.

#### Acceptance Criteria

1. WHEN a user accesses the form THEN the system SHALL display a searchable dropdown for District Name
2. WHEN a user selects a district THEN the system SHALL automatically populate the AUN field with exactly 9 digits
3. WHEN a user selects a school year THEN the system SHALL set an internal reporting_date to June 30th of the second year
4. WHEN a user enters contact information THEN the system SHALL validate:
   - Contact Name: Required, minimum 2 characters, only letters/spaces/hyphens/apostrophes
   - Phone Number: Required, formatted as (XXX) XXX-XXXX with 10 digits
   - Extension: Optional, numeric only
   - Email: Required, valid email format

### Requirement 2: Private Tutoring Section

**User Story:** As a district administrator, I want to report private tutoring data accurately, so that the state receives correct enrollment numbers.

#### Acceptance Criteria

1. WHEN a user answers "Did the district have students in Private Tutoring?" THEN the system SHALL require a Yes/No selection
2. WHEN a user selects "Yes" for private tutoring THEN the system SHALL enable and require the student count field
3. WHEN a user selects "No" for private tutoring THEN the system SHALL disable the student count field and set value to 0
4. WHEN a user enters a student count THEN the system SHALL validate it as a whole number greater than 0

### Requirement 3: Homeschooling Section

**User Story:** As a district administrator, I want to report homeschooling data with detailed demographics, so that the state has comprehensive enrollment information.

#### Acceptance Criteria

1. WHEN a user answers "Did the district have any home educated students?" THEN the system SHALL require a Yes/No selection
2. WHEN a user selects "Yes" for homeschooling THEN the system SHALL enable the enrollment grid for ages 5-21 by gender
3. WHEN a user selects "No" for homeschooling THEN the system SHALL disable the grid and set all values to 0
4. WHEN the grid is active THEN the system SHALL auto-calculate totals for rows, columns, and grand total
5. WHEN homeschooling exists THEN the system SHALL require the grand total to be greater than 0

### Requirement 4: Additional Homeschooling Data Fields

**User Story:** As a district administrator, I want to report detailed homeschooling program data, so that the state can track compliance and services.

#### Acceptance Criteria

1. WHEN a user enters data for questions 5-15 THEN the system SHALL validate all as whole numbers (0 or greater)
2. WHEN affidavits are rejected (Q5 > 0) THEN the system SHALL require the reason field (Q6) with 250 character limit
3. WHEN a user enters special education data THEN the system SHALL validate Q8 ≤ Q7
4. WHEN a user enters program participation data THEN the system SHALL validate individual counts don't exceed total homeschooled
5. WHEN a user enters total participants (Q15) THEN the system SHALL validate Q15 ≤ (Q12 + Q13 + Q14) AND Q15 ≥ MAX(Q12, Q13, Q14)

### Requirement 5: Cyber Program Section

**User Story:** As a district administrator, I want to report cyber program offerings by grade, so that the state can track digital education availability.

#### Acceptance Criteria

1. WHEN a user answers "Does the district have a cyber program?" THEN the system SHALL require a Yes/No selection
2. WHEN a user selects "Yes" for cyber program THEN the system SHALL enable grade checkboxes K-12
3. WHEN a user selects "No" for cyber program THEN the system SHALL disable and uncheck all grade boxes
4. WHEN a user enters comments THEN the system SHALL limit input to 250 characters

### Requirement 6: Cross-Field Logical Validation

**User Story:** As a district administrator, I want the system to catch logical inconsistencies in my data, so that I can correct errors before submission.

#### Acceptance Criteria

1. WHEN special education counts exceed totals THEN the system SHALL display specific error messages
2. WHEN program participation exceeds homeschooled totals THEN the system SHALL prevent submission
3. WHEN hearings exceed inappropriate programs THEN the system SHALL show validation error
4. WHEN participant totals violate logical rules THEN the system SHALL guide user to correct values
5. WHEN any validation fails THEN the system SHALL prevent CSV generation until resolved

### Requirement 7: CSV Generation and Export

**User Story:** As a district administrator, I want to generate a properly formatted CSV file, so that it can be successfully uploaded to PIMS.

#### Acceptance Criteria

1. WHEN a user clicks "Generate & Download CSV" THEN the system SHALL validate all data first
2. WHEN validation passes THEN the system SHALL generate filename as AUN_District_Fact_YYYYMMDDHHMMSS.csv
3. WHEN generating CSV THEN the system SHALL map form data according to the specified category structure
4. WHEN creating CSV rows THEN the system SHALL include only non-zero enrollment counts by age/gender
5. WHEN exporting THEN the system SHALL include all required columns with proper headers
6. WHEN download completes THEN the file SHALL be saved to the user's default Downloads folder

### Requirement 8: User Experience and Instructions

**User Story:** As a district administrator, I want clear instructions and guidance, so that I can complete the form correctly and understand the submission process.

#### Acceptance Criteria

1. WHEN a user accesses the form THEN the system SHALL display clear instructions about the reporting scope
2. WHEN validation errors occur THEN the system SHALL show specific, actionable error messages
3. WHEN sections are disabled THEN the system SHALL clearly indicate why and when they will be enabled
4. WHEN the form is complete THEN the system SHALL provide submission instructions for PIMS administrators
5. WHEN a user needs help THEN the system SHALL display contact information and relevant links