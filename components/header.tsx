"use client";

interface FoldableHeaderProps {
  onMenuClick: () => void;
  isMobileOpen: boolean;
}

export function FoldableHeader({ onMenuClick, isMobileOpen }: FoldableHeaderProps) {
  return (
    <header
      className="bg-[var(--black)] py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 shadow-md fixed top-0 left-0 right-0 z-50 border-b border-[var(--blue-700)]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden text-[var(--blue-400)] hover:text-[var(--blue-500)] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--blue-600)]">ToolFinder</h1>
        </div>
      </div>
    </header>
  );
}
