import React from 'react';
import { GraduationCap, ShieldCheck, FileText, Building2 } from 'lucide-react';

// App header (USWDS-inspired)
export const Header: React.FC = () => {

  return (
  <header id="app-header" className="bg-[#1a4480] text-white border-b border-black/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto py-3 md:py-4">
          {/* Title */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2.5 md:gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-white/10 ring-1 ring-white/20">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Education</span>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-semibold leading-tight">
                  Home Education & Private Tutoring Annual Report
                </h1>
                <p className="mt-0.5 text-blue-100 text-xs md:text-sm">
                  Report home education and private tutoring enrollment for your district.
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] md:text-xs">
              <span className="inline-flex items-center gap-1.5 rounded px-2.5 py-1 ring-1 ring-white/25 bg-white/5 text-blue-50">
                <Building2 className="h-4 w-4" aria-hidden="true" />
                Pennsylvania Department of Education
              </span>
              <span className="inline-flex items-center gap-1.5 rounded px-2.5 py-1 ring-1 ring-white/25 bg-white/5 text-blue-50">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Act 169 of 1988
              </span>
              <span className="inline-flex items-center gap-1.5 rounded px-2.5 py-1 ring-1 ring-white/25 bg-white/5 text-blue-50">
                <FileText className="h-4 w-4" aria-hidden="true" />
                PIMS Submission
              </span>
            </div>
          </div>
        </div>
      </div>

  {/* No nav */}
    </header>
  );
};
