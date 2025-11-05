import React from 'react';

export default function TrendingNews({ news = [], onOpen }) {
  return (
    <aside className="lg:col-span-1">
      <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm sticky top-4">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 text-sm font-semibold text-gray-900 dark:text-white">
          Trending News
        </div>
        <div className="p-3 space-y-2">
          {news.length === 0 ? (
            <div className="text-gray-500 dark:text-gray-400 text-sm">No news right now.</div>
          ) : (
            news.map((n) => (
              <button
                key={n.id}
                onClick={() => onOpen?.(n.url)}
                className="w-full text-left rounded-md p-3 transition bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                title={n.title}
              >
                <div className="text-sm text-gray-900 dark:text-white font-medium line-clamp-2">{n.title}</div>
                <div className="text-[11px] text-gray-600 dark:text-gray-400 mt-0.5">
                  {n.source} • {new Date(n.createdAt).toLocaleString()}
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}
