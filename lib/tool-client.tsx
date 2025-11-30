"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToolHero } from "@/components/tool-hero";

interface ToolClientProps {
  tool: {
    node: {
      id: string;
      name: string;
      tagline: string;
      description: string;
      thumbnail: { url: string };
      topics: {
        edges: Array<{
          node: {
            id: string;
            name: string;
          };
        }>;
      };
      media: Array<{
        url: string;
        type: string;
      }>;
      votesCount: number;
      website: string;
      pricing: Array<{
        "plan-type": string;
        "pricing in usd": string;
        description: string;
      }>;
    };
  };
}

export function ToolClient({ tool }: ToolClientProps) {
  const router = useRouter();
  const { node } = tool;

  // Track tool view for history
  useEffect(() => {
    if (tool) {
      const viewedTool = {
        id: tool.node.id,
        name: tool.node.name,
        logo: tool.node.thumbnail.url,
        viewedAt: Date.now()
      };

      const event = new CustomEvent("toolViewed", { detail: viewedTool });
      window.dispatchEvent(event);
    }
  }, [tool]);

  return (
    <div className="relative z-10 min-h-screen">
      <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:pr-80 py-4 sm:py-8">
        {/* Back Button - Responsive */}
        <button
          onClick={() => router.back()}
          className="mb-4 sm:mb-6 flex items-center gap-2 text-[var(--blue-400)] hover:text-[var(--blue-300)] transition-colors group"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-xs sm:text-sm font-medium">Back to tools</span>
        </button>

        {/* Tool Hero Section with Alternatives */}
        <ToolHero
          name={node.name}
          tagline={node.tagline}
          description={node.description}
          thumbnail={node.thumbnail.url}
          topics={node.topics}
          media={node.media}
          votesCount={node.votesCount}
          website={node.website}
          pricing={node.pricing}
          verified={node.votesCount > 100}
        />
      </div>
    </div>
  );
}
