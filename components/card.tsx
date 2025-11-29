"use client";

import Link from "next/link";

interface AIToolCardProps {
  id: string;
  name: string;
  tagline: string;
  thumbnail: string;
  preview: string;
  votesCount: number;
  createdAt: string;
  pricing: Array<{
    "plan-type": string;
    "pricing in usd": string;
    description: string;
  }>;
  verified?: boolean;
}

export function AIToolCard({
  id,
  name,
  tagline,
  thumbnail,
  preview,
  votesCount,
  createdAt,
  pricing,
  verified = false,
}: AIToolCardProps) {
  // Get the best pricing to display
  const freePlan = pricing.find((p) => p["pricing in usd"] === "0");
  const paidPlan = pricing.find((p) => p["pricing in usd"] !== "0" && p["pricing in usd"] !== "Custom");
  
  const displayPrice = freePlan 
    ? `Free + from $${paidPlan?.["pricing in usd"] || "0"}/mo`
    : paidPlan
    ? `$${paidPlan["pricing in usd"]}/mo`
    : "Custom pricing";

  // Calculate time ago
  const timeAgo = () => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffHours = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 24) return `Released ${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `Released ${diffDays}d ago`;
  };

  return (
    <Link href={`/tool/${id}`}>
      <div className="bg-(--black-200)/90 backdrop-blur-md rounded-xl overflow-hidden shadow-lg shadow-(--black)/60 hover:shadow-2xl hover:shadow-(--blue-600)/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer group border border-(--blue-900) dark:shadow-(--black)/60 light:shadow-[#f5e6d3]/50">
        {/* Header with Logo and Name */}
        <div className="bg-(--black-300)/80 p-3 border-b border-(--blue-900)">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <img
                src={thumbnail}
                alt={name}
                className="w-10 h-10 rounded-lg object-cover border-2 border-(--blue-600) shadow-md shadow-(--black)/50"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-bold text-[var(--text-primary)] drop-shadow-sm">{name}</h3>
                  {verified && (
                    <svg className="w-4 h-4 text-[var(--blue-400)] drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-1">{tagline}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Image */}
        <div className="px-3 py-2 bg-transparent">
          <div className="relative w-full aspect-22/12 overflow-hidden rounded-3xl bg-[var(--black-400)] shadow-inner shadow-[var(--black)]/80 border border-[var(--blue-900)]">
            <img
              src={preview}
              alt={`${name} preview`}
              className="w-full h-full object-fill transition-transform duration-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[var(--black-300)]/60 backdrop-blur-sm border-t border-[var(--blue-900)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm">
              <svg className="w-3.5 h-3.5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[var(--text-secondary)] text-xs">{timeAgo()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--blue-400)] font-bold text-xs drop-shadow-sm">{displayPrice}</span>
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-[var(--blue-900)]/30 rounded shadow-sm shadow-[var(--blue-600)]/30 border border-[var(--blue-800)]">
                <svg className="w-3.5 h-3.5 text-[var(--blue-400)] drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
                <span className="text-xs font-semibold text-[var(--blue-400)]">{votesCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
