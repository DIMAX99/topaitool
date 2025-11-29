"use client";

interface ToolDetailsProps {
  description: string;
  pricing: Array<{
    "plan-type": string;
    "pricing in usd": string;
    description: string;
  }>;
  website: string;
}

export function ToolDetails({ description, pricing, website }: ToolDetailsProps) {
  return (
    <section className="flex flex-col lg:flex-row gap-4">
      {/* Left Section: Description */}
      <div className="lg:flex-[2] space-y-4 bg-[var(--black-200)]/90 backdrop-blur-md rounded-2xl p-6 border border-[var(--blue-800)] shadow-xl shadow-[var(--blue-600)]/10">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-[var(--blue-400)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold text-[var(--blue-600)]">About This Tool</h3>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </div>
      </div>

      {/* Right Section: Pricing Plans */}
      <div className="lg:flex-1 space-y-4 bg-[var(--black-200)]/90 backdrop-blur-md rounded-2xl p-6 border border-[var(--blue-800)] shadow-xl shadow-[var(--blue-600)]/10">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-[var(--blue-400)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold text-[var(--blue-600)]">Pricing Plans</h3>
        </div>

        <div className="space-y-3">
          {pricing.map((plan, index) => (
            <div
              key={index}
              className="bg-[var(--black-300)]/60 border border-[var(--blue-800)] rounded-xl p-4 hover:border-[var(--blue-600)] transition-colors"
            >
              {/* Plan Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--blue-900)]/30 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[var(--blue-400)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[var(--text-primary)]">{plan["plan-type"]}</h4>
                    <p className="text-xs text-[var(--text-primary)]">Plan Type</p>
                  </div>
                </div>
                
                {/* Price Tag - Blue for prices */}
                <div className="text-right">
                  {plan["pricing in usd"] === "0" ? (
                    <span className="text-2xl font-bold text-[var(--blue-600)]">Free</span>
                  ) : plan["pricing in usd"] === "Custom" || plan["pricing in usd"].includes("%") ? (
                    <span className="text-lg font-bold text-[var(--blue-600)]">Custom</span>
                  ) : (
                    <div>
                      <span className="text-2xl font-bold text-[var(--blue-600)]">${plan["pricing in usd"]}</span>
                      <span className="text-sm text-[var(--text-primary)]">/mo</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Plan Description - Black text */}
              <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                {plan.description}
              </p>

              {/* Features Badge */}
              <div className="mt-3 flex items-center gap-2">
                {plan["pricing in usd"] === "0" && (
                  <span className="px-2 py-1 bg-[var(--success-bg)] border border-[var(--success-border)] rounded text-xs font-medium text-[var(--success)]">
                    Free Forever
                  </span>
                )}
                {index === pricing.length - 1 && pricing.length > 1 && (
                  <span className="px-2 py-1 bg-[var(--blue-900)]/30 border border-[var(--blue-700)] rounded text-xs font-medium text-[var(--blue-400)]">
                    Most Popular
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Note - Black text */}
        <div className="mt-4 p-3 bg-[var(--blue-900)]/20 border border-[var(--blue-800)] rounded-lg">
          <p className="text-xs text-[var(--text-primary)] flex items-start gap-2">
            <svg className="w-4 h-4 text-[var(--blue-400)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Prices are subject to change. Visit the official website for the most up-to-date pricing information.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
