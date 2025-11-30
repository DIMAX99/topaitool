"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "@/lib/providers";
import Image from "next/image";
const aiCategories = [
    {
      name: "Generate Image",
      slug: "generate-image",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: "Generate Video",
      slug: "generate-video",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: "For Music",
      slug: "for-music",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
    },
    {
      name: "For Writing",
      slug: "for-writing",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
    },
    {
      name: "For Text",
      slug: "for-text",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      name: "For Editing",
      slug: "for-editing",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
    {
      name: "For Code",
      slug: "for-code",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      name: "For Design",
      slug: "for-design",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    }
  ];
  
  const additionalOptions = [
    {
      name: "Offers Zone",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "text-[var(--blue-400)]"
    },
    {
      name: "Community",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "text-[var(--blue-400)]"
    },
    {
      name: "Support",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: "text-[var(--blue-400)]"
    }
  ];
interface SidebarProps {
  isMobileOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isMobileOpen, onClose }: SidebarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const { isDarkMode, toggleTheme } = useTheme();

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMobileOpen && !target.closest('aside') && !target.closest('button[aria-label="Toggle menu"]')) {
        onClose();
      }
    };

    if (isMobileOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileOpen, onClose]);

  // On mobile, always show full sidebar when open
  const isExpanded = isMobileOpen || isHovered;

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-[42px] sm:top-[50px] md:top-[60px] bottom-0 bg-[var(--black)] shadow-lg transition-all duration-300 ease-in-out z-40 border-r border-[var(--blue-900)]
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0
          ${isExpanded ? "w-64" : "w-16"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="h-full overflow-y-auto scrollbar-hide py-4">
          {/* Home Button */}
          <div className="mb-6 px-2">
            <Link
              href="/"
              onClick={() => onClose()}
              className={`w-full flex items-center gap-3 px-2 py-3 rounded-lg transition-colors relative ${
                pathname === "/"
                  ? "bg-[var(--blue-900)]/30 text-[var(--blue-600)]"
                  : "text-[var(--foreground)] hover:bg-[var(--blue-900)]/20"
              }`}
            >
              {pathname === "/" && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--blue-500)] rounded-r"></div>
              )}
              <svg className="w-6 h-6 text-[var(--blue-400)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className={`text-sm font-bold whitespace-nowrap transition-opacity duration-300 text-[var(--blue-600)] ${
                isExpanded ? "opacity-100" : "opacity-0 w-0"
              }`}>
                Home
              </span>
            </Link>
          </div>

          {/* Divider */}
          <div className="border-t border-[var(--blue-800)] mb-6"></div>

          {/* AI Categories */}
          <div className="mb-6">
            <nav className="space-y-1">
              {aiCategories.map((category) => {
                const isActive = pathname === `/category/${category.slug}`;
                return (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    onClick={() => onClose()}
                    className={`w-full flex items-center gap-3 px-4 py-3 transition-colors relative ${
                      isActive
                        ? "bg-[var(--blue-900)]/30 text-[var(--blue-600)]"
                        : "text-[var(--foreground)] hover:bg-[var(--blue-900)]/20"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--blue-500)]"></div>
                    )}
                    <span className={isActive ? "text-[var(--blue-400)]" : "text-[var(--blue-400)]"}>
                      {category.icon}
                    </span>
                    <span className={`text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${
                      isExpanded ? "opacity-100" : "opacity-0"
                    }`}>
                      {category.name}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Divider */}
          <div className="border-t border-[var(--blue-800)] my-4"></div>

          {/* Additional Options */}
          <div>
            <div className="px-4 mb-3">
              <h2 className={`text-xs font-semibold text-[var(--blue-500)] uppercase tracking-wider transition-opacity duration-300 ${
                isExpanded ? "opacity-100" : "opacity-0"
              }`}>
                More
              </h2>
            </div>
            <nav className="space-y-1">
              {additionalOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => onClose()}
                  className="w-full flex items-center gap-3 px-4 py-3 text-[var(--foreground)] hover:bg-[var(--blue-900)]/20 transition-colors"
                >
                  <span className={option.color}>{option.icon}</span>
                  <span className={`text-sm font-medium whitespace-nowrap transition-opacity duration-300 ${
                    isExpanded ? "opacity-100" : "opacity-0"
                  }`}>
                    {option.name}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Theme Toggle Switch - Below Support */}
          <div className="mt-4 px-2">
            <button
              onClick={toggleTheme}
              className={`w-full flex items-center py-2.5 px-2 transition-colors hover:bg-[var(--blue-900)]/20 rounded-lg ${
                isExpanded ? "justify-between" : "justify-center"
              }`}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {/* Left side: Icon and Label */}
              <div className="flex items-center gap-2.5 flex-shrink-0">
                <svg className="w-5 h-5 text-[var(--blue-400)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isDarkMode ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  )}
                </svg>
                {isExpanded && (
                  <span className="text-sm font-medium text-[var(--foreground)] whitespace-nowrap">
                    {isDarkMode ? "Dark Mode" : "Light Mode"}
                  </span>
                )}
              </div>
              
               {isExpanded && (
                <div className="relative w-14 h-7 flex-shrink-0 ml-2 flex items-center justify-center">
                  <Image
                    src={isDarkMode ? "/on.png" : "/off.png"}
                    alt="Theme Toggle"
                    width={50}
                    height={24}
                    className="object-contain"
                    priority
                  />
                </div>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
