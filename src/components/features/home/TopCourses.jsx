import React from 'react';

export default function TopCourses({ loading, courses, onOpen }) {
  return (
    <aside className="lg:col-span-1">
      <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm sticky top-20">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 text-sm font-semibold text-gray-900 dark:text-white">
          Top Courses
        </div>
        <div className="p-3 space-y-3">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-14 rounded-md bg-gray-100 dark:bg-gray-800 animate-pulse" />
            ))
          ) : courses.length === 0 ? (
            <div className="text-gray-500 dark:text-gray-400 text-sm">No courses yet.</div>
          ) : (
            courses.map((c) => (
              <button
                key={c.id}
                onClick={() => onOpen?.(c.id)}
                className="w-full text-left rounded-md p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <div className="text-gray-900 dark:text-white font-medium line-clamp-1">{c.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                  {c.instructor} • {c.level || '—'}
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}
