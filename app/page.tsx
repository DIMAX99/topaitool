"use client";

import { useState } from "react";
import { AIToolCard } from "@/components/card";
import { FilterDialog, FilterState } from "@/components/filter";
import data2 from "@/data/data2.json";

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeView, setActiveView] = useState<"latest" | "top-free" | "top-paid" | "grossing">("latest");
  const [visibleCount, setVisibleCount] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 100],
    category: "all",
    sortBy: "date-desc",
  });

  // Apply search filter to any list
  const applySearchFilter = (edges: typeof data2.data.posts.edges) => {
    if (!searchQuery.trim()) return edges;

    const query = searchQuery.toLowerCase();
    return edges.filter((edge) => {
      const nameMatch = edge.node.name.toLowerCase().includes(query);
      const taglineMatch = edge.node.tagline.toLowerCase().includes(query);
      const topicsMatch = edge.node.topics.edges.some(topic => 
        topic.node.name.toLowerCase().includes(query)
      );
      
      return nameMatch || taglineMatch || topicsMatch;
    });
  };

  // Apply filters and sorting (for Latest view)
  const applyFiltersAndSort = (edges: typeof data2.data.posts.edges) => {
    let filtered = [...edges];

    // Apply search first
    filtered = applySearchFilter(filtered);

    // Price filter (only for Latest view)
    if (activeView === "latest") {
      filtered = filtered.filter((edge) => {
        const prices = edge.node.pricing.map((p) => {
          const price = p["pricing in usd"];
          if (price === "0") return 0;
          if (price === "Custom" || price.includes("%")) return 999;
          return parseFloat(price);
        });
        const minPrice = Math.min(...prices);
        const maxPrice = filters.priceRange[1] >= 100 ? Infinity : filters.priceRange[1];
        
        if (minPrice < filters.priceRange[0] || minPrice > maxPrice) return false;

        // Category filter
        if (filters.category !== "all" && filters.category !== "all-categories") {
          const hasCategory = edge.node.topics.edges.some(
            (topic) => topic.node.name.toLowerCase().replace(/\s+/g, '-') === filters.category
          );
          if (!hasCategory) return false;
        }

        return true;
      });

      // Sorting
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case "price-asc":
            const priceA = Math.min(...a.node.pricing.map(p => {
              const price = p["pricing in usd"];
              return price === "0" ? 0 : price === "Custom" ? 999 : parseFloat(price);
            }));
            const priceB = Math.min(...b.node.pricing.map(p => {
              const price = p["pricing in usd"];
              return price === "0" ? 0 : price === "Custom" ? 999 : parseFloat(price);
            }));
            return priceA - priceB;
          case "price-desc":
            const priceA2 = Math.min(...a.node.pricing.map(p => {
              const price = p["pricing in usd"];
              return price === "0" ? 0 : price === "Custom" ? 999 : parseFloat(price);
            }));
            const priceB2 = Math.min(...b.node.pricing.map(p => {
              const price = p["pricing in usd"];
              return price === "0" ? 0 : price === "Custom" ? 999 : parseFloat(price);
            }));
            return priceB2 - priceA2;
          case "date-asc":
            return new Date(a.node.createdAt).getTime() - new Date(b.node.createdAt).getTime();
          case "date-desc":
            return new Date(b.node.createdAt).getTime() - new Date(a.node.createdAt).getTime();
          case "votes-desc":
            return b.node.votesCount - a.node.votesCount;
          default:
            return 0;
        }
      });
    }

    return filtered;
  };

  // Get tools based on active view
  const getToolsByView = () => {
    let baseTools: typeof data2.data.posts.edges = [];

    switch (activeView) {
      case "top-free":
        baseTools = data2.data.posts.edges.filter((edge) =>
          edge.node.pricing.some((p) =>
            p["pricing in usd"] === "0" || p["plan-type"].toLowerCase().includes("free")
          )
        );
        baseTools = applySearchFilter(baseTools);
        return baseTools.sort((a, b) => b.node.votesCount - a.node.votesCount);
      
      case "top-paid":
        baseTools = data2.data.posts.edges.filter((edge) =>
          edge.node.pricing.some((p) =>
            p["pricing in usd"] !== "0" &&
            p["pricing in usd"] !== "Custom" &&
            !p["plan-type"].toLowerCase().includes("free")
          )
        );
        baseTools = applySearchFilter(baseTools);
        return baseTools.sort((a, b) => b.node.votesCount - a.node.votesCount);
      
      case "grossing":
        baseTools = applySearchFilter(data2.data.posts.edges);
        return baseTools.sort((a, b) => b.node.votesCount - a.node.votesCount);
      
      case "latest":
      default:
        return applyFiltersAndSort(data2.data.posts.edges);
    }
  };

  const allFilteredTools = getToolsByView();
  const tools = allFilteredTools.slice(0, visibleCount);
  const hasMore = visibleCount < allFilteredTools.length;

  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + 10, allFilteredTools.length));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setVisibleCount(6);
  };

  const handleViewChange = (view: typeof activeView) => {
    setActiveView(view);
    setVisibleCount(6);
  };

  const getViewTitle = () => {
    switch (activeView) {
      case "top-free": return searchQuery ? "Top Free AI Tools - Search Results" : "Top Free AI Tools";
      case "top-paid": return searchQuery ? "Top Paid AI Tools - Search Results" : "Top Paid AI Tools";
      case "grossing": return searchQuery ? "Top Grossing AI Tools - Search Results" : "Top Grossing AI Tools";
      default: return searchQuery ? "Latest AI Tools - Search Results" : "Latest AI Tools";
    }
  };

  return (
    <div className="relative z-10">
      {/* Filter Dialog */}
      <FilterDialog
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={(newFilters) => setFilters(newFilters)}
      />

      {/* Page Content */}
      <div className="flex flex-col items-center justify-start px-4 py-8">
        {/* Search Bar with Filter Button */}
        <div className="w-full max-w-2xl mb-8 flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search for tools..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-6 py-4 pl-12 rounded-full bg-(--black-200)/90 backdrop-blur-md text-(--text-primary) placeholder-(--text-tertiary) border border-(--blue-800) focus:outline-none focus:ring-2 focus:ring-(--blue-500) transition-all"
            />
            <svg 
              className="w-5 h-5 text-(--text-tertiary) absolute left-4 top-1/2 -translate-y-1/2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setVisibleCount(6);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-(--text-tertiary) hover:text-(--text-primary) transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="px-6 py-4 rounded-full bg-(--blue-600) hover:bg-(--blue-700) text-white transition-colors flex items-center gap-2 font-semibold shadow-lg shadow-(--blue-600)/50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Filter
          </button>
        </div>

        {/* Switch Button - 4 Options */}
        <div className="flex items-center gap-2 mb-8 bg-(--black-200)/90 backdrop-blur-md rounded-full p-1 border border-(--blue-800)">
          <button
            onClick={() => handleViewChange("latest")}
            className={`px-4 py-2 rounded-full font-semibold text-xs transition-all duration-200 ${
              activeView === "latest"
                ? "bg-(--blue-600) text-white shadow-lg shadow-(--blue-600)/50"
                : "text-(--text-primary) hover:text-(--blue-400)"
            }`}
          >
            Latest
          </button>
          <button
            onClick={() => handleViewChange("top-free")}
            className={`px-4 py-2 rounded-full font-semibold text-xs transition-all duration-200 ${
              activeView === "top-free"
                ? "bg-(--blue-600) text-white shadow-lg shadow-(--blue-600)/50"
                : "text-(--text-primary) hover:text-(--blue-400)"
            }`}
          >
            Top Free
          </button>
          <button
            onClick={() => handleViewChange("top-paid")}
            className={`px-4 py-2 rounded-full font-semibold text-xs transition-all duration-200 ${
              activeView === "top-paid"
                ? "bg-(--blue-600) text-white shadow-lg shadow-(--blue-600)/50"
                : "text-(--text-primary) hover:text-(--blue-400)"
            }`}
          >
            Top Paid
          </button>
          <button
            onClick={() => handleViewChange("grossing")}
            className={`px-4 py-2 rounded-full font-semibold text-xs transition-all duration-200 ${
              activeView === "grossing"
                ? "bg-(--blue-600) text-white shadow-lg shadow-(--blue-600)/50"
                : "text-(--text-primary) hover:text-(--blue-400)"
            }`}
          >
            Top Grossing
          </button>
        </div>

        {/* Search Results Info - Works for all views */}
        {searchQuery && (
          <div className="w-full max-w-7xl mb-4 px-4 sm:px-8 lg:px-16">
            <p className="text-sm text-(--text-primary)">
              Found <span className="font-bold text-(--blue-600)">{allFilteredTools.length}</span> result{allFilteredTools.length !== 1 ? 's' : ''} for {searchQuery} in <span className="font-semibold text-(--blue-600)">{
                activeView === "top-free" ? "Top Free" :
                activeView === "top-paid" ? "Top Paid" :
                activeView === "grossing" ? "Top Grossing" :
                "Latest"
              }</span>
            </p>
          </div>
        )}

        {/* Tools Grid */}
        <section className="w-full px-4 sm:px-8 lg:px-16 max-w-7xl mb-20">
          <h2 className="text-3xl font-bold text-(--blue-600) mb-8">
            {getViewTitle()}
          </h2>
          
          {tools.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((edge) => (
                  <AIToolCard
                    key={edge.node.id}
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
                ))}
              </div>

              {/* Show More Button */}
              {hasMore && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={handleShowMore}
                    className="px-8 py-4 bg-(--blue-600) hover:bg-(--blue-700) text-white rounded-full font-semibold text-base transition-all duration-200 shadow-lg shadow-(--blue-600)/50 hover:shadow-xl hover:shadow-(--blue-600)/60 hover:scale-105 flex items-center gap-2"
                  >
                    <span>Show More AI Tools</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                      +{Math.min(10, allFilteredTools.length - visibleCount)} more
                    </span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="bg-(--black-200)/90 backdrop-blur-md rounded-2xl p-12 border border-(--blue-800) text-center">
              <svg className="w-20 h-20 text-(--text-tertiary) mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-(--text-primary) mb-2">No Tools Found</h2>
              <p className="text-(--text-primary) mb-4">
                {searchQuery 
                  ? `No results for "${searchQuery}" in ${
                      activeView === "top-free" ? "Top Free" :
                      activeView === "top-paid" ? "Top Paid" :
                      activeView === "grossing" ? "Top Grossing" :
                      "Latest"
                    }. Try different keywords or clear your search.`
                  : "No tools available in this category yet."
                }
              </p>
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setVisibleCount(6);
                  }}
                  className="px-6 py-3 bg-(--blue-600) hover:bg-(--blue-700) text-white rounded-full font-semibold transition-all"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}