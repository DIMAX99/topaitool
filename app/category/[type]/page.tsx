"use client";

import { use, useState } from "react";
import { AIToolCard } from "@/components/card";
import data2 from "@/data/data2.json";
import { notFound } from "next/navigation";
import Link from "next/link";
interface CategoryPageProps {
  params: Promise<{ type: string }>;
}

// Category mapping
const categoryMap: { [key: string]: string } = {
  "generate-image": "Generate Image",
  "generate-video": "Generate Video",
  "for-music": "For Music",
  "for-writing": "For Writing",
  "for-text": "For Text",
  "for-editing": "For Editing",
  "for-code": "For Code",
  "for-design": "For Design",
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const { type } = use(params);
  const [visibleCount, setVisibleCount] = useState(9);
  
  const categoryName = categoryMap[type];
  
  if (!categoryName) {
    notFound();
  }

  // Filter tools by type
  const filteredTools = data2.data.posts.edges.filter((edge) =>
    edge.node.type && edge.node.type.includes(categoryName)
  );

  const visibleTools = filteredTools.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTools.length;

  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + 9, filteredTools.length));
  };

  return (
    <div className="relative z-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm mb-4">
          <Link href="/" className="text-(--blue-400) hover:text-(--blue-300) transition-colors">
            Home
          </Link>
          <svg className="w-4 h-4 text-(--text-tertiary)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-(--text-primary) font-semibold">{categoryName}</span>
        </nav>

        {/* Category Header */}
        <div className="bg-(--black-200)/90 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-(--blue-800) shadow-xl shadow-(--blue-600)/10 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-(--text-primary) mb-2">{categoryName}</h1>
              <p className="text-(--text-secondary) text-sm md:text-base">
                Discover {filteredTools.length} AI tools in this category
              </p>
            </div>
            
            {/* Category Icon */}
            <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-(--blue-600)/20 border-2 border-(--blue-600) shrink-0">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-(--blue-400)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {type === "generate-image" && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                )}
                {type === "generate-video" && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                )}
                {type === "for-music" && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                )}
                {type === "for-writing" && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                )}
                {type === "for-text" && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                )}
                {type === "for-editing" && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                )}
                {type === "for-code" && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                )}
                {type === "for-design" && (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                )}
              </svg>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {visibleTools.map((edge) => (
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
              <div className="flex justify-center">
                <button
                  onClick={handleShowMore}
                  className="px-8 py-4 bg-(--blue-600) hover:bg-(--blue-700) text-white rounded-full font-semibold text-base transition-all duration-200 shadow-lg shadow-(--blue-600)/50 hover:shadow-xl hover:shadow-(--blue-600)/60 hover:scale-105 flex items-center gap-2"
                >
                  <span>Show More Tools</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    +{Math.min(9, filteredTools.length - visibleCount)} more
                  </span>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-(--black-200)/90 backdrop-blur-md rounded-2xl p-12 border border-(--blue-800) text-center">
            <svg className="w-20 h-20 text-(--text-tertiary) mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-(--text-primary) mb-2">No Tools Found</h2>
            <p className="text-(--text-secondary)">We could not find any tools in this category yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
