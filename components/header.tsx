"use client";

import { useState } from "react";

export function FoldableHeader() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header
      className="bg-[var(--black)] py-4 px-6 shadow-md transition-all duration-300 ease-in-out fixed top-0 left-0 right-0 z-50 border-b border-[var(--blue-700)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo/Name - Always Visible - Blue in both modes */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--blue-600)]">ToolFinder</h1>
      </div>

      {/* Expandable Content - Scrollable */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isHovered ? "max-h-[400px] opacity-100 mt-6" : "max-h-0 opacity-0"
        }`}
      >
        <div className="overflow-y-auto max-h-[350px] pr-2 scrollbar-thin scrollbar-thumb-[var(--blue-600)] scrollbar-track-transparent">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* For Students */}
            <div className="bg-[var(--black-200)] rounded-lg p-4 hover:bg-[var(--black-300)] border border-[var(--blue-900)] transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-3">
                {/* ...existing icon... */}
                <h3 className="text-base sm:text-lg font-bold text-[var(--blue-600)]">For Students</h3>
              </div>
              <p className="text-[var(--text-primary)] text-xs sm:text-sm mb-2">
                Access free and affordable AI tools perfect for learning and academic projects
              </p>
              <ul className="text-[var(--text-primary)] text-[10px] sm:text-xs space-y-1">
                <li>• Free tier available</li>
                <li>• Student discounts</li>
                <li>• Educational resources</li>
              </ul>
            </div>

            {/* For Professionals */}
            <div className="bg-[var(--black-200)] rounded-lg p-4 hover:bg-[var(--black-300)] border border-[var(--blue-900)] transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-3">
                {/* ...existing icon... */}
                <h3 className="text-base sm:text-lg font-bold text-[var(--blue-600)]">For Professionals</h3>
              </div>
              <p className="text-[var(--text-primary)] text-xs sm:text-sm mb-2">
                Powerful AI tools to boost productivity and streamline your workflow
              </p>
              <ul className="text-[var(--text-primary)] text-[10px] sm:text-xs space-y-1">
                <li>• Premium features</li>
                <li>• Advanced integrations</li>
                <li>• Priority support</li>
              </ul>
            </div>

            {/* For Enterprise */}
            <div className="bg-[var(--black-200)] rounded-lg p-4 hover:bg-[var(--black-300)] border border-[var(--blue-900)] transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-3">
                {/* ...existing icon... */}
                <h3 className="text-base sm:text-lg font-bold text-[var(--blue-600)]">For Enterprise</h3>
              </div>
              <p className="text-[var(--text-primary)] text-xs sm:text-sm mb-2">
                Scalable AI solutions for teams and organizations of any size
              </p>
              <ul className="text-[var(--text-primary)] text-[10px] sm:text-xs space-y-1">
                <li>• Custom solutions</li>
                <li>• Dedicated support</li>
                <li>• Team management</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
