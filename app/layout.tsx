"use client";

import { useState, useEffect,createContext, useContext } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { FoldableHeader } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { RightSidebar } from "@/components/rightside";
import SmoothScroll from "@/lib/smooth_scroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Create Theme Context
const ThemeContext = createContext<{
  isDarkMode: boolean;
  toggleTheme: () => void;
}>({
  isDarkMode: true,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <html lang="en" className={isDarkMode ? 'dark' : ''}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          backgroundImage: isDarkMode ? 'url(/bg.jpg)' : 'url(/30.jpg)',
          backgroundColor: isDarkMode ? 'transparent' : '#ffffff',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          minHeight: '100vh'
        }}
      >
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
      </body>
    </html>
  );
}
