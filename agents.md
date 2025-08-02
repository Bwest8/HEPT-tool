agents.md

Purpose
This document summarizes the updates required to generate a PIMS “District Fact” CSV from the form data, aligning outputs to a measure/category schema and ensuring consistent validation and export behavior.

Key Changes
1) Export format shift to PIMS District Fact schema
- Implemented `CSVRow` structure with fields: `DISTRICT_CODE`, `REPORTING_DATE`, `CATEGORY_01..11`, `PRIMARY_MEASURE_TYPE`, `COUNT`, `AMOUNT`, `PERCENT`, `INDICATOR`, `START_DATE`, `END_DATE`, `COMMENT`.
- Introduced `generateCSVData(formData)` to transform form inputs into multiple rows following PIMS categories/measures.
- Implemented `downloadCSV(formData)` to build a quoted, properly escaped CSV and download it using a timestamped filename: `<AUN>_DISTRICT_FACT_<YYYYMMDDHHMM>.csv`.

2) Normalization of Yes/No values
- Issue: UI/types used 'Yes' | 'No' but export code compared against 'yes' (lowercase).
- Resolution: Normalize comparisons via helper `isYes(v) => String(v).toLowerCase() === 'yes'`, ensuring indicators evaluate correctly.

3) Enrollment data model alignment
- Issue: Earlier `FormData.q4_enrollments` was `Record<string, number>` (typically grade-based). The new export expects Age x Gender keys (`q4_age{5..21}_males` and `q4_age{5..21}_females`).
- Options:
  a) Keep Age x Gender: Ensure UI captures and stores counts in the required keys.
  b) Switch to Grade-based measures (K–12): Replace age/gender loops with grade loops and use `CATEGORY_04='GRADE'`.
- Action: Confirm and standardize the measure category set used by the form and export to avoid zeroed counts.

4) CSV escaping and header handling
- Implemented robust CSV cell escaping: doubles embedded quotes and quotes cells containing commas, quotes, or newlines.
- Headers are human-readable labels (e.g., "DISTRICT CODE") independent from internal `CSVRow` keys; ensure downstream consumer expects these exact strings.

5) Reporting date calculation
- `REPORTING_DATE` derived via `calculateReportingDate(school_year)` (June 30 of the ending school year).
- Action: Verify the output format matches PIMS requirements (e.g., MM/DD/YYYY or YYYY-MM-DD) and adjust if necessary.

6) Consistency for numeric fields
- `COUNT`, `AMOUNT`, `PERCENT` are emitted as numeric strings only when applicable; otherwise empty strings.
- All numeric pulls apply `Number(...)` with fallbacks to 0 and `Number.isFinite` checks.

7) Conditional rows
- Contact info rows (contact name, phone, extension, email) emitted as `INDICATOR` rows with payload in `COMMENT`.
- Private Tutoring:
  - Indicator row always emitted.
  - Total count row emitted only when indicator is Yes.
- Affidavits:
  - Returned count row always emitted.
  - Reason row emitted only when count > 0 and reasons provided.
- Comments row emitted only when a comment exists.
- Cyber Program:
  - District indicator row always emitted.
  - Grade-level indicator rows emitted for each K–12 grade, based on inclusion in `q17_cyber_grades_offered`.

Implementation Notes
- Core functions/files:
  - `generateCSVData(formData)` builds an array of `CSVRow`.
  - `downloadCSV(formData)` escapes cells, writes header + data lines, and triggers download.
- Filename format: `${formData.district_aun}_DISTRICT_FACT_${YYYYMMDDHHMM}.csv`.
- Ensure UI validation and types align with the chosen measure set:
  - If keeping Age x Gender, update `FormData` to include or clearly document the `q4_age{5..21}_males/females` keys inside `q4_enrollments`.
  - If switching to Grade-based, update export loops accordingly.

Open Decisions / Next Steps
- Confirm the official measure category set for enrollments:
  - Age 5–21 by Gender, or
  - Grade K–12 (optionally by Gender).
- Confirm required date format for `REPORTING_DATE`.
- Align form validation to prevent mismatches (e.g., enforce 'Yes'/'No' and numeric non-negatives).
- Optionally add unit tests for `generateCSVData` to validate row counts and category consistency.