import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// reactions: { like:[], dislike:[], funny:[], insightful:[] }
// activeTab: 'all' | 'like' | 'dislike' | 'funny' | 'insightful'
export default function LikesModal({ isOpen, onClose, reactions = {}, activeTab = 'all', onTabChange, onUserClick, title = 'Reactions' }) {
  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'like', label: 'Like', icon: '👍' },
    { key: 'dislike', label: 'Dislike', icon: '👎' },
    { key: 'funny', label: 'Funny', icon: '😄' },
    { key: 'insightful', label: 'Insightful', icon: '💡' },
  ];

  const lists = {
    like: reactions.like || [],
    dislike: reactions.dislike || [],
    funny: reactions.funny || [],
    insightful: reactions.insightful || [],
  };

  const allList = Object.entries(lists).flatMap(([type, arr]) => (arr || []).map((u) => ({ ...u, __type: type })));
  const current = activeTab === 'all' ? allList : lists[activeTab] || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md mx-4 rounded-2xl bg-white/95 dark:bg-neutral-900/95 text-neutral-900 dark:text-white shadow-2xl border border-neutral-200 dark:border-neutral-800 backdrop-blur-md overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            {/* Header */}
            <div className="px-5 py-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/20">
              <h3 className="text-base font-semibold tracking-wide">{title}</h3>
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="px-3 pt-3">
              <div className="flex gap-2 text-xs">
                {tabs.map((t) => {
                  const isActive = activeTab === t.key;
                  const count = t.key === 'all'
                    ? allList.length
                    : (lists[t.key]?.length || 0);
                  return (
                    <button
                      key={t.key}
                      onClick={() => onTabChange?.(t.key)}
                      className={`px-3 py-1.5 rounded-full border transition ${isActive ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
                    >
                      <span className="mr-1">{t.icon || ''}</span>{t.label}
                      <span className={`ml-2 inline-block px-2 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 dark:bg-neutral-800'}`}>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Body */}
            <div className="p-4 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-700">
              {current.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-sm text-neutral-500 dark:text-neutral-400">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                    alt="No likes"
                    className="w-16 h-16 opacity-70 mb-3"
                  />
                  <p>No reactions yet</p>
                </div>
              ) : (
                <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {current.map((u, idx) => (
                    <li
                      key={`${u.id}_${idx}`}
                      className="py-3 flex items-center gap-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 rounded-lg transition-all cursor-pointer"
                      onClick={() => onUserClick?.(u)}
                    >
                      <img
                        src={u.avatarUrl || '/default-avatar.png'}
                        alt={u.name}
                        className="w-10 h-10 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate hover:underline">{u.name}</p>
                        {u.title && (
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                            {u.title}
                          </p>
                        )}
                      </div>
                      {u.__type && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 capitalize">
                          {u.__type}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
