"use client";

import { useState } from "react";

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
}

export interface FilterState {
  priceRange: [number, number];
  category: string;
  sortBy: string;
}
  const categories = [
    "All Categories",
    "Developer Tools",
    "Artificial Intelligence",
    "Productivity",
    "Design Tools",
    "Marketing",
    "Sales",
    "Education",
    "Open Source",
    "SaaS"
  ];
    const sortOptions = [
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "date-asc", label: "Date: Oldest First" },
    { value: "date-desc", label: "Date: Newest First" },
  ];

export function FilterDialog({ isOpen, onClose, onApplyFilters }: FilterDialogProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [category, setCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date-desc");




  const handleApply = () => {
    onApplyFilters({
      priceRange,
      category,
      sortBy,
    });
    onClose();
  };

  const handleReset = () => {
    setPriceRange([0, 100]);
    setCategory("all");
    setSortBy("date-desc");
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRange([0, value]);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={onClose} />

      {/* Dialog */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-5rem)] sm:w-[calc(100%-8rem)] md:w-[420px] max-w-[320px] sm:max-w-[420px] bg-[var(--black-200)]/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl z-50 p-3 sm:p-6 border-2 border-[var(--blue-700)] max-h-[85vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-6">
          <h2 className="text-base sm:text-2xl font-bold text-white flex items-center gap-1.5 sm:gap-2">
            <svg className="w-4 h-4 sm:w-6 sm:h-6 text-[var(--blue-400)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Filters
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors -mr-1"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-3 sm:space-y-6">
          {/* Price Range */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-3">
              Price Range: $0 - {priceRange[1] >= 100 ? "$100+" : `$${priceRange[1]}`}
            </label>
            <div className="flex items-center gap-2 sm:gap-4">
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange[1]}
                onChange={handleRangeChange}
                className="flex-1 h-2 bg-[var(--black-400)] rounded-lg appearance-none cursor-pointer accent-[var(--blue-500)]"
              />
              <span className="text-xs sm:text-sm font-medium text-[var(--blue-400)] min-w-[45px] sm:min-w-[60px]">
                {priceRange[1] >= 100 ? "$100+" : `$${priceRange[1]}`}
              </span>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-3">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-2.5 sm:px-4 py-2 sm:py-3 text-xs sm:text-base rounded-lg bg-[var(--black-300)] text-white border border-[var(--blue-800)] focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat.toLowerCase().replace(/\s+/g, '-')}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-white mb-1.5 sm:mb-3">Sort By</label>
            <div className="space-y-1.5 sm:space-y-2">
              {sortOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-[var(--black-300)]/50 hover:bg-[var(--black-400)] border border-[var(--blue-900)] transition-colors cursor-pointer"
                >
                  <input
                    type="radio"
                    name="sortBy"
                    value={option.value}
                    checked={sortBy === option.value}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--blue-500)] bg-[var(--black-400)] border-[var(--blue-800)] focus:ring-[var(--blue-500)] focus:ring-2"
                  />
                  <span className="text-xs sm:text-sm text-white">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3 sm:mt-6 pt-3 sm:pt-6 border-t border-[var(--blue-800)]">
          <button
            onClick={handleReset}
            className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-[var(--black-400)] text-white hover:bg-[var(--black-500)] transition-colors font-medium border border-[var(--blue-900)] text-xs sm:text-base"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-[var(--blue-600)] text-white hover:bg-[var(--blue-700)] transition-colors font-semibold shadow-lg shadow-[var(--blue-600)]/50 text-xs sm:text-base"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}
