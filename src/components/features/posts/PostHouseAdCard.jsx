import React from 'react';
import { motion } from 'framer-motion';

export default function PostHouseAdCard({
  title = 'Gnanify Sponsored',
  subtitle = 'Promoted • Sponsored',
  ctaText = 'Explore Gnanify',
  ctaHref = '/products',
  bannerImage = '',
  className = ''
}) {
  const likes = 256;
  const dislikes = 5;
  const funny = 18;
  const insightful = 21;
  const commentsCount = 42;
  const reposts = 11;
  const shares = 28;

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
                <div className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Just now</div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-gray-900 dark:text-gray-100 whitespace-pre-wrap text-[15px] leading-relaxed">
          Learn. Build. Share — with Gnanify. Explore our ecosystem of products and tools.
        </div>

        <div className="mt-4">
          {bannerImage ? (
            <img
              src={bannerImage}
              alt="Gnanify"
              className="w-full rounded-xl object-cover max-h-[420px] border border-gray-200 dark:border-gray-800"
            />
          ) : (
            <div className="w-full h-40 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-600/15 via-purple-600/15 to-emerald-500/15" />
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span>👍 {likes}</span>
            <span>👎 {dislikes}</span>
            <span>😄 {funny}</span>
            <span>💡 {insightful}</span>
          </div>
          <a
            href={ctaHref}
            className="px-3 py-1.5 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {ctaText}
          </a>
        </div>

        <div className="mt-3 border-t border-gray-200 dark:border-gray-800 pt-2 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span>💬 {commentsCount}</span>
          <span>🔁 {reposts}</span>
          <span>📤 {shares}</span>
        </div>
      </div>
    </motion.div>
  );
}
