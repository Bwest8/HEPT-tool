# Home Education and Private Tutoring Annual Report Form

A React + TypeScript web application for Pennsylvania school districts to complete the annual Home Education and Private Tutoring reporting requirements (Act 169 of 1988). The app validates inputs and exports a PIMS-ready CSV.

- Entry: [index.html](index.html), [src/main.tsx](src/main.tsx)
- App shell: [src/App.tsx](src/App.tsx)
- Styles: [src/index.css](src/index.css), [tailwind.config.js](tailwind.config.js), [postcss.config.js](postcss.config.js)
- Build config: [vite.config.ts](vite.config.ts), [tsconfig.json](tsconfig.json)
- Deployment: [.github/workflows/deploy.yml](.github/workflows/deploy.yml)

## Overview

The application guides district users through required sections for the annual report, with real-time validation, accessible UI, and a CSV export aligned to PIMS. Sections are organized, collapsible, and color-coded for clarity.

## Features

- District information and contact details
  - Component: [src/components/DistrictInformation.tsx](src/components/DistrictInformation.tsx)
- Homeschooling enrollments by age and gender (ages 5–21)
  - Grid: [src/components/EnrollmentGrid.tsx](src/components/EnrollmentGrid.tsx)
- Cyber program offerings by grade
  - Components: [src/components/CyberProgramSection.tsx](src/components/CyberProgramSection.tsx), [src/components/CyberProgramGrid.tsx](src/components/CyberProgramGrid.tsx)
- District selection with AUN lookup
  - Component: [src/components/DistrictSelect.tsx](src/components/DistrictSelect.tsx)
- Additional comments and notes
  - Component: [src/components/AdditionalComments.tsx](src/components/AdditionalComments.tsx)
- Important reminders and PDE support resources
  - Component: [src/components/ImportantReminders.tsx](src/components/ImportantReminders.tsx)
- Built-in validation, error summary on export, success messaging
  - Orchestrated in [src/App.tsx](src/App.tsx)
- CSV export suitable for PIMS submission
  - Export triggered from [src/App.tsx](src/App.tsx)

## Technology Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)
- ESLint (flat config)

## Getting Started

Prerequisites:
- Node.js 18+
- npm or yarn

Install and run:
```bash
git clone <repository-url>
cd HEPT-tool
npm install
npm run dev
```

Open http://localhost:5173/HEPT-tool/

Build and preview:
```bash
npm run build
npm run preview
```

## Project Structure

```
.
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── tsconfig.json
├── .github/
│   └── workflows/
│       └── deploy.yml
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── components/
    │   ├── AdditionalComments.tsx
    │   ├── CyberProgramGrid.tsx
    │   ├── CyberProgramSection.tsx
    │   ├── DistrictInformation.tsx
    │   ├── DistrictSelect.tsx
    │   ├── EnrollmentGrid.tsx
    │   └── ImportantReminders.tsx
    ├── data/
    ├── lib/
    ├── types/
    └── utils/
```

## Accessibility & UX

- Semantic headings and regions with labels (e.g., “Important Reminders & Support” in [src/components/ImportantReminders.tsx](src/components/ImportantReminders.tsx))
- Keyboard-focusable controls with visible focus states
- Clear validation and error summaries on export attempt
- Responsive layout via Tailwind CSS ([src/index.css](src/index.css))

## CSV Export

- Validates before export (scrolls to first error if present)
- On success, triggers CSV download and displays a success message
- See the export flow in [src/App.tsx](src/App.tsx)

## Deployment (GitHub Pages)

This repo includes a GitHub Actions workflow for Pages: [.github/workflows/deploy.yml](.github/workflows/deploy.yml)

Typical setup:
- Push to default branch to build and deploy the app to GitHub Pages
- Output directory: `dist`
- Ensure Pages is enabled in your repository settings

## Compliance & Reporting

Supports PA reporting needs for:
- Act 169 of 1988 (24 P.S. Sec. 13-1327.1)
- PIMS submission formatting via CSV output
- Annual reporting requirements (districts must report even with zero counts)

## Configuration

- Tailwind tokens and themes in [src/index.css](src/index.css) and [tailwind.config.js](tailwind.config.js)
- Vite config in [vite.config.ts](vite.config.ts)
- TypeScript config in [tsconfig.json](tsconfig.json)
- Linting rules in [eslint.config.js](eslint.config.js)

## Support

- PDE Home Education and Private Tutoring: see reminders in [src/components/ImportantReminders.tsx](src/components/ImportantReminders.tsx)
- Email: ra-home-education@pa.gov

## Contributing

- Keep UI state and validation centralized in [src/App.tsx](src/App.tsx)
- Add new components under [src/components/](src/components/)
- Keep data types under [src/types/](src/types/) and helpers under [src/utils/](src/utils/)

## License

This project is designed for use by Pennsylvania school districts for official reporting purposes.
