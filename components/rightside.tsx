"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ViewedTool {
  id: string;
  name: string;
  logo: string;
  viewedAt: number;
}


export function RightSidebar() {
  const now = Date.now();
  const [viewHistory, setViewHistory] = useState<ViewedTool[]>([]);

  const newsItems = [
    {
      id: 1,
      title: "OpenAI Releases GPT-5",
      description: "Major breakthrough in AI language models",
      time: "2 hours ago",
      category: "AI News"
    },
    {
      id: 2,
      title: "New Image Generation Tool",
      description: "Revolutionary AI art platform launched",
      time: "5 hours ago",
      category: "Launch"
    },
    {
      id: 3,
      title: "AI Tool Discounts",
      description: "Up to 50% off on premium AI tools",
      time: "1 day ago",
      category: "Offers"
    },
    {
      id: 4,
      title: "Video AI Updates",
      description: "Enhanced video generation capabilities",
      time: "2 days ago",
      category: "Update"
    }
  ];

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("viewedTools");
    if (savedHistory) {
      setViewHistory(JSON.parse(savedHistory));
    }

    // Listen for custom event when a tool is viewed
    const handleToolViewed = (event: CustomEvent<ViewedTool>) => {
      const newTool = event.detail;
      
      setViewHistory((prev) => {
        // Remove if already exists
        const filtered = prev.filter((tool) => tool.id !== newTool.id);
        // Add to beginning
        const updated = [newTool, ...filtered].slice(0, 10); // Keep only last 10
        
        // Save to localStorage
        localStorage.setItem("viewedTools", JSON.stringify(updated));
        
        return updated;
      });
    };

    window.addEventListener("toolViewed" ,handleToolViewed as EventListener);
    
    return () => {
      window.removeEventListener("toolViewed",handleToolViewed as EventListener);
    };
  }, []);

  const clearHistory = () => {
    setViewHistory([]);
    localStorage.removeItem("viewedTools");
  };

  const getTimeAgo = (timestamp: number) => {
    
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  return (
    <aside className="fixed right-0 top-[60px] bottom-0 w-72 shadow-lg z-40 flex flex-col border-l border-[var(--blue-900)]">
      <div className="h-full flex flex-col p-3 gap-3 overflow-hidden">
        {/* News Section */}
        <div className="bg-[var(--black-200)]/90 backdrop-blur-md rounded-xl p-3 flex-1 flex flex-col min-h-0 border border-[var(--blue-900)]">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--blue-800)] flex-shrink-0">
            <svg
              className="w-4 h-4 text-[var(--blue-400)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <h2 className="text-sm font-bold text-[var(--text-primary)]">Latest News</h2>
          </div>
          
          <div className="space-y-2 flex-1 overflow-hidden hover:overflow-y-auto scrollbar-hide">
            {newsItems.map((news) => (
              <div
                key={news.id}
                className="bg-[var(--black-300)]/80 backdrop-blur-sm rounded-lg p-2.5 hover:bg-[var(--black-400)]/90 transition-colors cursor-pointer border border-[var(--blue-900)]/50"
              >
                <div className="flex items-start justify-between mb-1.5">
                  <span className="text-[10px] font-medium text-[var(--blue-400)] bg-[var(--blue-900)]/30 px-1.5 py-0.5 rounded">
                    {news.category}
                  </span>
                  <span className="text-[10px] text-[var(--text-tertiary)]">{news.time}</span>
                </div>
                <h3 className="text-xs font-semibold text-[var(--text-primary)] mb-1 leading-tight">
                  {news.title}
                </h3>
                <p className="text-[10px] text-[var(--text-secondary)] line-clamp-2 leading-tight">
                  {news.description}
                </p>
              </div>
            ))}
          </div>
          
          <button className="w-full text-xs text-[var(--blue-400)] hover:text-[var(--blue-300)] font-medium transition-colors mt-2 pt-2 border-t border-[var(--blue-800)] flex-shrink-0">
            View all →
          </button>
        </div>

        {/* History Section */}
        <div className="bg-[var(--black-200)]/90 backdrop-blur-md rounded-xl p-3 flex-1 flex flex-col min-h-0 border border-[var(--blue-900)]">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--blue-800)] flex-shrink-0">
            <svg
              className="w-4 h-4 text-[var(--blue-400)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-sm font-bold text-[var(--text-primary)]">Recently Viewed</h2>
          </div>
          
          <div className="space-y-1.5 flex-1 overflow-hidden hover:overflow-y-auto scrollbar-hide">
            {viewHistory.length > 0 ? (
              viewHistory.map((item) => (
                <div
                  key={`${item.id}-${item.viewedAt}`}
                  className="flex items-center gap-2.5 p-2 bg-[var(--black-300)]/80 backdrop-blur-sm rounded-lg hover:bg-[var(--black-400)]/90 transition-colors cursor-pointer border border-[var(--blue-900)]/50"
                >
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="w-8 h-8 rounded-md flex-shrink-0 object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-[var(--text-primary)] truncate">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-[var(--text-tertiary)]">
                      {getTimeAgo(item.viewedAt)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <svg className="w-12 h-12 text-[var(--text-tertiary)] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-[var(--text-secondary)]">No tools viewed yet</p>
                <p className="text-[10px] text-[var(--text-tertiary)] mt-1">Start exploring to see your history</p>
              </div>
            )}
          </div>
          
          {viewHistory.length > 0 && (
            <button 
              onClick={clearHistory}
              className="w-full text-xs text-[var(--blue-400)] hover:text-[var(--blue-300)] font-medium transition-colors mt-2 pt-2 border-t border-[var(--blue-800)] flex-shrink-0"
            >
              Clear history
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
