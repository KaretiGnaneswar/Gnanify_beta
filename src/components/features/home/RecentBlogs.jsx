import React from 'react';

export default function RecentBlogs({ loading, blogs, onOpen }) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Blogs</h2>
        </div>
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-14 rounded-md bg-gray-100 dark:bg-gray-800 animate-pulse" />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400 text-sm">No blogs yet.</div>
        ) : (
          <div className="space-y-3">
            {blogs.map((b) => (
              <button
                key={b.id || b._id}
                onClick={() => onOpen?.(b.id || b._id)}
                className="w-full text-left rounded-md p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <div className="text-gray-900 dark:text-white font-medium line-clamp-1">{b.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{b.content}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
