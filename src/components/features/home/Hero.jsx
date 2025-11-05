import React from 'react';

export default function Hero({ onBlogsClick, onCoursesClick }) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
      <div className="p-5 md:flex md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back 👋</h1>
          <p className="text-gray-500 dark:text-gray-400">Here’s a quick overview of what’s new.</p>
        </div>
        <div className="flex gap-2 mt-3 md:mt-0">
          <button
            className="px-4 py-2 rounded-md bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
            onClick={onBlogsClick}
          >
            Write a Blog
          </button>
          <button
            className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            onClick={onCoursesClick}
          >
            Browse Courses
          </button>
        </div>
      </div>
    </div>
  );
}
