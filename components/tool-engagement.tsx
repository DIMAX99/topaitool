"use client";

import { useState } from "react";

interface ToolEngagementProps {
  votesCount: number;
  website: string;
  pricing: Array<{
    "plan-type": string;
    "pricing in usd": string;
    description: string;
  }>;
}

export function ToolEngagement({ votesCount, website, pricing }: ToolEngagementProps) {
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [localVotes, setLocalVotes] = useState(votesCount);
  const [discussionFilter, setDiscussionFilter] = useState<"latest" | "top" | "worst">("latest");
  const [newComment, setNewComment] = useState("");

  // Calculate rating (for demo purposes, based on votes)
  const rating = Math.min((votesCount / 200) * 5, 5).toFixed(1);
  const ratingPercentage = (parseFloat(rating) / 5) * 100;

  const handleUpvote = () => {
    if (!hasUpvoted) {
      setLocalVotes(prev => prev + 1);
      setHasUpvoted(true);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Handle comment submission
      console.log("New comment:", newComment);
      setNewComment("");
    }
  };

  // Sample discussions
  const discussions = [
    {
      id: 1,
      user: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      comment: "This tool has been incredibly helpful for my workflow! The AI suggestions are spot-on.",
      time: "2 hours ago",
      likes: 12
    },
    {
      id: 2,
      user: "Sarah Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      comment: "Great product! Would love to see more customization options in the future.",
      time: "5 hours ago",
      likes: 8
    },
    {
      id: 3,
      user: "Mike Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      comment: "The pricing is reasonable and the features are excellent. Highly recommend!",
      time: "1 day ago",
      likes: 15
    }
  ];

  return (
    <section className="bg-[var(--black-200)]/90 backdrop-blur-md rounded-2xl p-6 border border-[var(--blue-800)] shadow-xl shadow-[var(--blue-600)]/10">
      {/* Section 1: Votes & Rating */}
      <div className="flex items-center justify-center gap-12 mb-8 pb-8 border-b border-[var(--blue-800)]">
        {/* Upvote Button */}
        <button
          onClick={handleUpvote}
          disabled={hasUpvoted}
          className={`flex flex-col items-center justify-center px-12 py-8 rounded-xl transition-all duration-200 ${
            hasUpvoted
              ? "bg-[var(--blue-600)] text-white cursor-not-allowed"
              : "bg-[var(--black-300)] hover:bg-[var(--blue-600)] text-[var(--text-primary)] hover:text-white"
          } border-2 border-[var(--blue-700)] shadow-lg`}
        >
          <svg className="w-10 h-10 mb-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
          <span className="text-3xl font-bold">{localVotes}</span>
          <span className="text-sm uppercase mt-1">Upvotes</span>
        </button>

        {/* Rating Graph */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-base font-semibold text-[var(--blue-600)]">Overall Rating</span>
            <span className="text-3xl font-bold text-[var(--blue-600)]">{rating}</span>
          </div>
          
          <div className="relative w-40 h-40 mx-auto">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="var(--black-400)"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="var(--blue-500)"
                strokeWidth="10"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - ratingPercentage / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-[var(--blue-600)]">{rating}</span>
              <span className="text-sm text-[var(--text-primary)]">out of 5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Discussions */}
      <div>
        {/* Header with Sort Filter */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[var(--blue-600)] flex items-center gap-2">
            <svg className="w-6 h-6 text-[var(--blue-400)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Discussions ({Math.floor(votesCount / 3)})
          </h3>

          {/* Sort Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setDiscussionFilter("latest")}
              className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-all ${
                discussionFilter === "latest"
                  ? "bg-[var(--blue-600)] text-white shadow-md"
                  : "bg-[var(--black-300)] text-[var(--text-primary)] hover:bg-[var(--black-400)] border border-[var(--blue-800)]"
              }`}
            >
              Latest
            </button>
            <button
              onClick={() => setDiscussionFilter("top")}
              className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-all ${
                discussionFilter === "top"
                  ? "bg-[var(--blue-600)] text-white shadow-md"
                  : "bg-[var(--black-300)] text-[var(--text-primary)] hover:bg-[var(--black-400)] border border-[var(--blue-800)]"
              }`}
            >
              Top
            </button>
            <button
              onClick={() => setDiscussionFilter("worst")}
              className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-all ${
                discussionFilter === "worst"
                  ? "bg-[var(--blue-600)] text-white shadow-md"
                  : "bg-[var(--black-300)] text-[var(--text-primary)] hover:bg-[var(--black-400)] border border-[var(--blue-800)]"
              }`}
            >
              Worst
            </button>
          </div>
        </div>

        {/* Discussion List */}
        <div className="space-y-4 mb-6">
          {discussions.map((discussion) => (
            <div
              key={discussion.id}
              className="bg-[var(--black-300)]/50 rounded-lg p-4 border border-[var(--blue-900)]/50 hover:border-[var(--blue-700)] transition-colors"
            >
              <div className="flex items-start gap-3">
                <img
                  src={discussion.avatar}
                  alt={discussion.user}
                  className="w-10 h-10 rounded-full border-2 border-[var(--blue-600)]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[var(--text-primary)] text-sm">{discussion.user}</span>
                    <span className="text-xs text-[var(--text-primary)]">{discussion.time}</span>
                  </div>
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed mb-3">
                    {discussion.comment}
                  </p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-xs text-[var(--text-primary)] hover:text-[var(--blue-400)] transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      {discussion.likes}
                    </button>
                    <button className="text-xs text-[var(--text-primary)] hover:text-[var(--blue-400)] transition-colors">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <form onSubmit={handleCommentSubmit} className="space-y-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full px-4 py-3 bg-[var(--black-300)] border border-[var(--blue-800)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] resize-none"
            rows={3}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="px-6 py-2 bg-[var(--blue-600)] hover:bg-[var(--blue-700)] disabled:bg-[var(--black-400)] disabled:cursor-not-allowed text-white rounded-lg font-semibold text-sm transition-all shadow-lg disabled:shadow-none"
            >
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
