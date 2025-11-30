"use client";

import { AIToolCard } from "@/components/card";
import data2 from "@/data/data2.json";
import { useMemo } from "react";

interface ToolAlternativesProps {
  currentToolId: string;
  categories: string[];
}

export function ToolAlternatives({ currentToolId, categories }: ToolAlternativesProps) {
  const alternatives = useMemo(() => 
    data2.data.posts.edges
      .filter((edge) => {
        if (edge.node.id === currentToolId) return false;
        return edge.node.topics.edges.some((topic) =>
          categories.includes(topic.node.name)
        );
      })
      .slice(0, 10),
    [currentToolId, categories]
  );

  if (alternatives.length === 0) {
    return null; 
  }

  return (
    <section className="bg-[var(--black-200)]/90 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[var(--blue-800)] shadow-xl shadow-[var(--blue-600)]/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--blue-400)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--blue-600)]">
            Similar AI Tools
          </h3>
        </div>
        <span className="text-xs sm:text-sm text-[var(--text-secondary)] bg-[var(--blue-900)]/30 px-2 sm:px-3 py-1 rounded-full">
          {alternatives.length} tools
        </span>
      </div>

      {/* Horizontally Scrollable Container */}
      <div className="relative -mx-4 sm:-mx-6">
        <div className="overflow-x-auto scrollbar-hide px-4 sm:px-6 pb-2">
          <div className="flex gap-4 sm:gap-6 min-w-max">
            {alternatives.map((edge) => (
              <div key={edge.node.id} className="w-[280px] sm:w-[320px] md:w-[360px] flex-shrink-0">
                <AIToolCard
                  id={edge.node.id}
                  name={edge.node.name}
                  tagline={edge.node.tagline}
                  thumbnail={edge.node.thumbnail.url}
                  preview={edge.node.media[0]?.url || edge.node.thumbnail.url}
                  votesCount={edge.node.votesCount}
                  createdAt={edge.node.createdAt}
                  pricing={edge.node.pricing}
                  verified={edge.node.votesCount > 100}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicators - Hidden on mobile */}
        <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--black-200)] to-transparent pointer-events-none"></div>
        <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--black-200)] to-transparent pointer-events-none"></div>
      </div>

      {/* Scroll Hint for Mobile */}
      <div className="flex sm:hidden items-center justify-center gap-2 mt-4 text-xs text-[var(--text-tertiary)]">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
        <span>Swipe to see more</span>
      </div>
    </section>
  );
}
