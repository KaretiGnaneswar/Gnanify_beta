import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Repeat, Share2, ThumbsUp, ThumbsDown, Smile, Lightbulb } from 'lucide-react';

export default function PostCard({
  post,
  currentReaction,
  onLike,
  onDislike,
  onFunny,
  onInsightful,
  onRepost,
  onShare,
  onComment,
  onAuthorClick,
  onReactionsClick
}) {
  const p = post;
  const [comment, setComment] = useState('');

  const likes = Number(p.likes || 0);
  const dislikes = Number(p.dislikes || 0);
  const funny = Number(p.funny || 0);
  const insightful = Number(p.insightful || 0);
  const reposts = Number(p.reposts || 0);
  const shares = Number(p.shares || 0);
  const commentsCount = Array.isArray(p.comments) ? p.comments.length : 0;

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-lg transition-all duration-200"
    >
      <div className="p-5">
        {/* --- Author Info --- */}
        <div className="flex items-start gap-3">
          <button
            onClick={() => onAuthorClick?.(p.author)}
            title={p.author?.name || 'User'}
            className="shrink-0"
          >
            <img
              src={p.author?.avatarUrl || '/default-avatar.png'}
              alt={p.author?.name}
              className="w-12 h-12 rounded-full object-cover ring-1 ring-gray-300 dark:ring-gray-700"
            />
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <button
                  onClick={() => onAuthorClick?.(p.author)}
                  className="text-sm font-semibold text-gray-900 dark:text-white hover:underline"
                >
                  {p.author?.name || 'User'}
                </button>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {(p.author?.title || '')} {p.author?.company ? `• ${p.author.company}` : ''}
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(p.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* --- Post Content --- */}
        {p.text && (
          <div className="mt-4 text-gray-900 dark:text-gray-100 whitespace-pre-wrap text-[15px] leading-relaxed">
            {p.text}
          </div>
        )}

        {p.image && (
          <div className="mt-4">
            <img
              src={p.image}
              alt="post"
              className="w-full rounded-xl object-cover max-h-[480px] border border-gray-200 dark:border-gray-800"
            />
          </div>
        )}

        {/* --- Reaction Stats --- */}
        <div className="mt-4 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onReactionsClick?.(p.id, 'like')}
              className="hover:text-blue-600 transition"
            >
              👍 {likes}
            </button>
            <button
              onClick={() => onReactionsClick?.(p.id, 'dislike')}
              className="hover:text-red-600 transition"
            >
              👎 {dislikes}
            </button>
            <button
              onClick={() => onReactionsClick?.(p.id, 'funny')}
              className="hover:text-yellow-600 transition"
            >
              😄 {funny}
            </button>
            <button
              onClick={() => onReactionsClick?.(p.id, 'insightful')}
              className="hover:text-emerald-600 transition"
            >
              💡 {insightful}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span><MessageCircle className="inline w-4 h-4 mr-1" /> {commentsCount}</span>
            <span><Repeat className="inline w-4 h-4 mr-1" /> {reposts}</span>
            <span><Share2 className="inline w-4 h-4 mr-1" /> {shares}</span>
          </div>
        </div>

        {/* --- Action Buttons --- */}
        <div className="mt-3 border-t border-gray-200 dark:border-gray-800 pt-2 grid grid-cols-6 gap-2">
          <button
            onClick={() => onLike?.(p.id)}
            className={`py-2 rounded-md text-sm flex justify-center items-center gap-1 font-medium transition-all ${
              currentReaction === 'like'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40'
                : 'hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300'
            }`}
          >
            <ThumbsUp className="w-4 h-4" /> Like
          </button>
          <button
            onClick={() => onDislike?.(p.id)}
            className={`py-2 rounded-md text-sm flex justify-center items-center gap-1 font-medium transition-all ${
              currentReaction === 'dislike'
                ? 'bg-red-100 text-red-700 dark:bg-red-900/40'
                : 'hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300'
            }`}
          >
            <ThumbsDown className="w-4 h-4" /> Dislike
          </button>
          <button
            onClick={() => onFunny?.(p.id)}
            className={`py-2 rounded-md text-sm flex justify-center items-center gap-1 font-medium transition-all ${
              currentReaction === 'funny'
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40'
                : 'hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300'
            }`}
          >
            <Smile className="w-4 h-4" /> Funny
          </button>
          <button
            onClick={() => onInsightful?.(p.id)}
            className={`py-2 rounded-md text-sm flex justify-center items-center gap-1 font-medium transition-all ${
              currentReaction === 'insightful'
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40'
                : 'hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300'
            }`}
          >
            <Lightbulb className="w-4 h-4" /> Insightful
          </button>
          <button
            onClick={() => onRepost?.(p.id)}
            className="py-2 rounded-md text-sm flex justify-center items-center gap-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition"
          >
            <Repeat className="w-4 h-4" /> Repost
          </button>
          <button
            onClick={() => onShare?.(p.id)}
            className="py-2 rounded-md text-sm flex justify-center items-center gap-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition"
          >
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>

        {/* --- Comment Input --- */}
        <div className="mt-4 flex items-center gap-2">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 text-sm px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-neutral-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            onClick={() => {
              const text = comment.trim();
              if (!text) return;
              onComment?.(p.id, text);
              setComment('');
            }}
            className="px-4 py-2 text-sm rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all"
          >
            Comment
          </button>
        </div>

        {/* --- Comments --- */}
        {Array.isArray(p.comments) && p.comments.length > 0 && (
          <div className="mt-4 space-y-3">
            {p.comments.slice(0, 2).map((c) => (
              <div key={c.id} className="flex items-start gap-2">
                <button
                  onClick={() => onAuthorClick?.(c.author)}
                  className="shrink-0"
                >
                  <img
                    src={c.author?.avatarUrl || '/default-avatar.png'}
                    alt={c.author?.name}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-200 dark:ring-gray-700"
                  />
                </button>
                <div className="rounded-xl bg-gray-100 dark:bg-white/10 px-4 py-2">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white hover:underline">
                    {c.author?.name || 'User'}
                  </p>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{c.text}</p>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 block mt-1">
                    {new Date(c.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
            {p.comments.length > 2 && (
              <div className="text-xs text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                View all {p.comments.length} comments
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
