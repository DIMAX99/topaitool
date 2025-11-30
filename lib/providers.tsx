"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { FoldableHeader } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { RightSidebar } from "@/components/rightside";
import SmoothScroll from "@/lib/smooth_scroll";

// Create Theme Context
const ThemeContext = createContext<{
  isDarkMode: boolean;
  toggleTheme: () => void;
}>({
  isDarkMode: true,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <SmoothScroll>
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        {/* Header */}
        <FoldableHeader 
          onMenuClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} 
          isMobileOpen={isMobileSidebarOpen}
          onRightSidebarToggle={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
          isRightSidebarOpen={isRightSidebarOpen}
        />

        {/* Sidebar with theme toggle */}
        <Sidebar
          isMobileOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        {/* Right Sidebar - Works on all screen sizes */}
        <RightSidebar 
          isMobileOpen={isRightSidebarOpen}
          onClose={() => setIsRightSidebarOpen(false)}
        />

        {/* Main Content Area - Responsive margins */}
        <main className="ml-0 lg:ml-16 mt-[42px] sm:mt-[50px] md:mt-[60px]">
          {children}
        </main>
      </ThemeContext.Provider>
    </SmoothScroll>
  );
}
