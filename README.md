# Home Education and Private Tutoring Annual Report Form

A React-based web application for Pennsylvania school districts to complete their annual reporting requirements for home education and private tutoring students as mandated by Act 169 of 1988.

## Overview

This application provides a comprehensive digital form that helps Pennsylvania school districts collect, validate, and export data about:
- Private tutoring students
- Home-educated students (by age and gender)
- Special education services for homeschooled students
- Student participation in district programs
- Cyber program offerings

The form generates a CSV file that can be uploaded to the Pennsylvania Information Management System (PIMS) for official submission to the Pennsylvania Department of Education.

## Features

### 📋 Comprehensive Data Collection
- **District Information**: Contact details, AUN, and school year selection
- **Private Tutoring**: Student counts and program existence tracking
- **Homeschooling**: Detailed enrollment grids, affidavit processing, and program participation
- **Cyber Programs**: Grade level offerings and program availability

### ✅ Built-in Validation
- Real-time form validation with error highlighting
- Required field enforcement
- Data consistency checks (e.g., special education counts vs. total enrollments)
- Phone number formatting and validation

### 📊 Interactive Components
- Age/gender enrollment grid for homeschooled students
- Grade level selection grid for cyber programs
- District name autocomplete with AUN lookup
- Dynamic form sections that show/hide based on responses

### 📁 Data Export
- CSV export functionality for PIMS submission
- Validation before export to ensure data integrity
- Formatted output ready for administrative upload

### 🎨 User Experience
- Responsive design with Tailwind CSS
- Clear section organization with color-coded categories
- Helpful instructions and reminders throughout the form
- Error summary with direct links to problematic fields

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Testing**: Vitest with React Testing Library
- **Linting**: ESLint with TypeScript support

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd home-education-report-form
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── FormField.tsx   # Form field wrapper with labels and errors
│   ├── FormSection.tsx # Form section container
│   ├── Input.tsx       # Styled input component
│   ├── Select.tsx      # Dropdown select component
│   ├── RadioGroup.tsx  # Radio button group
│   ├── Textarea.tsx    # Multi-line text input
│   ├── EnrollmentGrid.tsx    # Age/gender enrollment grid
│   ├── CyberProgramGrid.tsx  # Grade level selection grid
│   └── DistrictSelect.tsx    # District name autocomplete
├── types/
│   └── form.ts         # TypeScript interfaces
├── utils/
│   ├── validation.ts   # Form validation logic
│   ├── csvExport.ts    # CSV generation utilities
│   └── schoolYear.ts   # School year calculation
├── data/
│   └── districts.ts    # Pennsylvania district data
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## Key Components

### FormData Interface
The application uses a comprehensive TypeScript interface to manage all form data, including:
- District and contact information
- Private tutoring metrics
- Homeschooling enrollment and services data
- Cyber program details

### Validation System
- Real-time validation with immediate feedback
- Comprehensive error checking before form submission
- Data consistency validation (e.g., ensuring special education counts don't exceed total enrollments)

### CSV Export
Generates a properly formatted CSV file that matches PIMS requirements for easy upload by district administrators.

## Compliance & Reporting

This application helps districts comply with:
- **Act 169 of 1988** (24 P.S. Sec. 13-1327.1) - Home education reporting requirements
- **PIMS Submission** - Pennsylvania Information Management System data upload
- **Annual Reporting Mandate** - Required submission for all districts, even with zero counts

## Support

For questions about the reporting requirements or technical issues:
- Email: ra-home-education@pa.gov
- Visit the Pennsylvania Department of Education Home Education webpage

## Development

### Adding New Features
1. Update the `FormData` interface in `src/types/form.ts`
2. Add validation rules in `src/utils/validation.ts`
3. Create or modify components as needed
4. Update CSV export logic in `src/utils/csvExport.ts`

### Testing
The application includes comprehensive tests for:
- Form validation logic
- Component rendering and interactions
- CSV export functionality
- Data consistency checks

Run tests with:
```bash
npm run test
```

## License

This project is designed for use by Pennsylvania school districts for official reporting purposes.