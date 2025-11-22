import React from 'react';
import { motion } from 'framer-motion';
import AdSlot from '@/components/AdSlot';

export default function PostAdCard({ slot, title = 'Sponsored', className = '' }) {
  const hasSlot = !!slot;
  const likes = 128;
  const dislikes = 3;
  const funny = 12;
  const insightful = 9;
  const commentsCount = 24;
  const reposts = 7;
  const shares = 15;

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-lg transition-all duration-200 ${className}`}
    >
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className="shrink-0">
            <img
              src={'/favicon.svg'}
              alt={title}
              className="w-12 h-12 rounded-full object-cover ring-1 ring-gray-300 dark:ring-gray-700"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{title}</span>
                <div className="text-xs text-gray-500 dark:text-gray-400">Promoted • Sponsored</div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Just now</div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-gray-900 dark:text-gray-100 whitespace-pre-wrap text-[15px] leading-relaxed">
          Discover more from Gnanify partners.
        </div>

        <div className="mt-4">
          {hasSlot ? (
            <AdSlot slot={slot} />
          ) : (
            <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-white/5 p-6 text-center text-sm text-gray-500 dark:text-gray-400">
              Ad preview — provide <code>slot</code> to render live AdSense unit
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-3">
            <span className="hover:text-blue-600 transition">👍 {likes}</span>
            <span className="hover:text-red-600 transition">👎 {dislikes}</span>
            <span className="hover:text-yellow-600 transition">😄 {funny}</span>
            <span className="hover:text-emerald-600 transition">💡 {insightful}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>💬 {commentsCount}</span>
            <span>🔁 {reposts}</span>
            <span>📤 {shares}</span>
          </div>
        </div>

        <div className="mt-3 border-t border-gray-200 dark:border-gray-800 pt-2 grid grid-cols-6 gap-2">
          <button disabled className="py-2 rounded-md text-sm flex justify-center items-center gap-1 font-medium text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-white/5 cursor-not-allowed">Like</button>
          <button disabled className="py-2 rounded-md text-sm flex justify-center items-center gap-1 font-medium text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-white/5 cursor-not-allowed">Dislike</button>
          <button disabled className="py-2 rounded-md text-sm flex justify-center items-center gap-1 font-medium text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-white/5 cursor-not-allowed">Funny</button>
          <button disabled className="py-2 rounded-md text-sm flex justify-center items-center gap-1 font-medium text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-white/5 cursor-not-allowed">Insightful</button>
          <button disabled className="py-2 rounded-md text-sm flex justify-center items-center gap-1 font-medium text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-white/5 cursor-not-allowed">Repost</button>
          <button disabled className="py-2 rounded-md text-sm flex justify-center items-center gap-1 font-medium text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-white/5 cursor-not-allowed">Share</button>
        </div>
      </div>
    </motion.div>
  );
}
