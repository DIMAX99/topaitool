"use client";
import { ToolMedia } from "@/components/tool-media";
import { ToolDetails } from "@/components/tool-details";
import { ToolEngagement } from "@/components/tool-engagement";
import { ToolAlternatives } from "@/components/tool-alternatives";

interface ToolHeroProps {
  name: string;
  tagline: string;
  description: string;
  thumbnail: string;
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
  verified?: boolean;
}

export function ToolHero({
  name,
  tagline,
  description,
  thumbnail,
  topics,
  media,
  votesCount,
  website,
  pricing,
  verified = false,
}: ToolHeroProps) {
  // Extract category names for alternatives
  const categories = topics.edges.map((topic) => topic.node.name);

  return (
    <>
      <section className="bg-[var(--black-200)]/90 backdrop-blur-md rounded-2xl p-6 border border-[var(--blue-800)] shadow-xl shadow-[var(--blue-600)]/10 mb-6 relative">
        {/* Redirect Icon - Top Right Corner */}
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-6 right-6 p-2 bg-[var(--blue-600)] hover:bg-[var(--blue-700)] rounded-lg transition-all duration-200 shadow-lg shadow-[var(--blue-600)]/50 hover:shadow-xl hover:shadow-[var(--blue-600)]/60 hover:scale-110 group"
          title="Visit Website"
        >
          <svg
            className="w-5 h-5 text-[var(--text-primary)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>

        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-[var(--blue-600)] shadow-md shadow-[var(--blue-600)]/30 bg-[var(--black-300)]">
              <img
                src={thumbnail}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name and Description */}
          <div className="flex-1 min-w-0 pr-12">
            {/* Name with Verified Badge - Blue heading */}
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-[var(--blue-600)]">
                {name}
              </h1>
              {verified && (
                <svg
                  className="w-5 h-5 text-[var(--blue-400)] flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>

            {/* Tagline - Black text */}
            <p className="text-base text-[var(--text-primary)] font-medium mb-3">
              {tagline}
            </p>
            {/* Tags - Black text */}
            <div className="flex flex-wrap gap-2">
              {topics.edges.map((topic) => (
                <span
                  key={topic.node.id}
                  className="px-2.5 py-1 bg-[var(--black-400)] border border-[var(--blue-800)] rounded-full text-xs font-medium text-[var(--text-primary)]"
                >
                  {topic.node.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tool Media Gallery */}
        <section className="mt-6">
          <ToolMedia
            media={media}
            name={name}
          />
        </section>
      </section>

      {/* Tool Description & Pricing Section */}
      <div className="mb-6">
        <ToolDetails
          description={description}
          pricing={pricing}
          website={website}
        />
      </div>

      {/* Tool Engagement Section */}
      <div className="mb-6">
        <ToolEngagement
          votesCount={votesCount}
          website={website}
          pricing={pricing}
        />
      </div>

      {/* Alternatives Section */}
      <ToolAlternatives
        currentToolId={topics.edges[0]?.node.id || ""}
        categories={categories}
      />
    </>
  );
}
