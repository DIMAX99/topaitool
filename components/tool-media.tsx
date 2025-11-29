"use client";

import { useState } from "react";

interface ToolMediaProps {
  media: Array<{
    url: string;
    type: string;
  }>;
  name: string;
}

export function ToolMedia({ media, name }: ToolMediaProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!media || media.length === 0) return null;

  const selectedMedia = media[selectedIndex];

  return (
    <section className="flex flex-col justify-center align-middle">
      {/* Main Media Display */}
      <div className="mb-4">
        <div className="relative w-full aspect-video bg-[var(--black-300)] rounded-xl overflow-hidden border-2 border-[var(--blue-700)]">
          {selectedMedia.type === "video" ? (
            <video
              src={selectedMedia.url}
              controls
              className="w-full h-full object-contain"
              poster={selectedMedia.url.replace('.jpeg', '.jpg')}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={selectedMedia.url}
              alt={`${name} - Image ${selectedIndex + 1}`}
              className="w-full h-full object-contain"
            />
          )}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {media.length > 1 && (
        <div className="flex gap-3 justify-center overflow-x-auto scrollbar-hide">
          {media.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                selectedIndex === index
                  ? "border-[var(--blue-500)] ring-2 ring-[var(--blue-500)]/50"
                  : "border-[var(--blue-800)] hover:border-[var(--blue-600)]"
              }`}
            >
              {item.type === "video" ? (
                <div className="relative w-full h-full bg-[var(--black-400)]">
                  <img
                    src={item.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              ) : (
                <img
                  src={item.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Media Counter */}
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-400">
          {selectedIndex + 1} / {media.length}
        </span>
      </div>
    </section>
  );
}
