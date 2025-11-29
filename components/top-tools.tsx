"use client";

import data2 from "@/data/data2.json";

export function TopTools() {
  // Free tools (filter by pricing with $0 or free tier)
  const topFreeTools = data2.data.posts.edges
    .filter((edge) => 
      edge.node.pricing.some((p) => 
        p["pricing in usd"] === "0" || p["plan-type"].toLowerCase().includes("free")
      )
    )
    .slice(0, 4);

  // Paid tools (filter by pricing with non-zero cost)
  const topPaidTools = data2.data.posts.edges
    .filter((edge) => 
      edge.node.pricing.some((p) => 
        p["pricing in usd"] !== "0" && 
        p["pricing in usd"] !== "Custom" &&
        !p["plan-type"].toLowerCase().includes("free")
      )
    )
    .slice(0, 3);

  // Top grossing tools (sorted by votes as a proxy for popularity)
  const topGrossingTools = data2.data.posts.edges
    .sort((a, b) => b.node.votesCount - a.node.votesCount)
    .slice(0, 4);

  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 max-w-7xl mb-20">
      <h2 className="text-3xl font-bold text-white mb-8">Top AI Tools</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top Free */}
        <div className="bg-[var(--black-200)]/90 backdrop-blur-md rounded-2xl p-6 border border-[var(--blue-900)]">
          <h3 className="text-xl font-bold text-[var(--blue-400)] mb-4">Top Free</h3>
          <div className="space-y-4">
            {topFreeTools.map((edge) => (
              <div
                key={edge.node.id}
                className="bg-[var(--black-300)]/80 backdrop-blur-sm rounded-lg p-4 hover:bg-[var(--black-400)]/90 transition-colors cursor-pointer border border-[var(--blue-900)]/50"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={edge.node.thumbnail.url}
                    alt={edge.node.name}
                    className="w-10 h-10 rounded-lg object-cover border-2 border-[var(--blue-600)]"
                  />
                  <h4 className="text-white font-semibold text-sm">{edge.node.name}</h4>
                </div>
                <p className="text-gray-400 text-xs mb-2">{edge.node.tagline}</p>
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                  <svg className="w-4 h-4 text-[var(--blue-400)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-[var(--blue-400)]">{edge.node.votesCount}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 rounded-lg bg-[var(--black-300)]/80 backdrop-blur-sm text-[var(--blue-400)] hover:bg-[var(--blue-600)] hover:text-white transition-colors text-sm font-medium border border-[var(--blue-800)]">
            Show more
          </button>
        </div>

        {/* Top Paid */}
        <div className="bg-[var(--black-200)]/90 backdrop-blur-md rounded-2xl p-6 border border-[var(--blue-900)]">
          <h3 className="text-xl font-bold text-[var(--blue-400)] mb-4">Top Paid</h3>
          <div className="space-y-4">
            {topPaidTools.map((edge) => {
              const paidPlan = edge.node.pricing.find((p) => 
                p["pricing in usd"] !== "0" && p["pricing in usd"] !== "Custom"
              );
              return (
                <div
                  key={edge.node.id}
                  className="bg-[var(--black-300)]/80 backdrop-blur-sm rounded-lg p-4 hover:bg-[var(--black-400)]/90 transition-colors cursor-pointer border border-[var(--blue-900)]/50"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={edge.node.thumbnail.url}
                      alt={edge.node.name}
                      className="w-10 h-10 rounded-lg object-cover border-2 border-[var(--blue-600)]"
                    />
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-sm">{edge.node.name}</h4>
                      <span className="text-[var(--blue-400)] text-xs font-medium">
                        ${paidPlan?.["pricing in usd"]}/mo
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs mb-2">{edge.node.tagline}</p>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <svg className="w-4 h-4 text-[var(--blue-400)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-[var(--blue-400)]">{edge.node.votesCount}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="w-full mt-4 py-2 rounded-lg bg-[var(--black-300)]/80 backdrop-blur-sm text-[var(--blue-400)] hover:bg-[var(--blue-600)] hover:text-white transition-colors text-sm font-medium border border-[var(--blue-800)]">
            Show more
          </button>
        </div>

        {/* Top Grossing */}
        <div className="bg-[var(--black-200)]/90 backdrop-blur-md rounded-2xl p-6 border border-[var(--blue-900)]">
          <h3 className="text-xl font-bold text-[var(--blue-400)] mb-4">Top Grossing</h3>
          <div className="space-y-4">
            {topGrossingTools.map((edge) => (
              <div
                key={edge.node.id}
                className="bg-[var(--black-300)]/80 backdrop-blur-sm rounded-lg p-4 hover:bg-[var(--black-400)]/90 transition-colors cursor-pointer border border-[var(--blue-900)]/50"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={edge.node.thumbnail.url}
                    alt={edge.node.name}
                    className="w-10 h-10 rounded-lg object-cover border-2 border-[var(--blue-600)]"
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm">{edge.node.name}</h4>
                    <span className="text-[var(--blue-400)] text-xs font-medium">
                      {edge.node.votesCount} votes
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 text-xs mb-2">{edge.node.tagline}</p>
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                  <svg className="w-4 h-4 text-[var(--blue-400)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-[var(--blue-400)]">{edge.node.votesCount}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 rounded-lg bg-[var(--black-300)]/80 backdrop-blur-sm text-[var(--blue-400)] hover:bg-[var(--blue-600)] hover:text-white transition-colors text-sm font-medium border border-[var(--blue-800)]">
            Show more
          </button>
        </div>
      </div>
    </section>
  );
}
