import React from 'react';

export default function Stats({ items }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((s) => (
        <div
          key={s.label}
          className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
        >
          <div className="text-sm text-gray-600 dark:text-gray-400">{s.label}</div>
          <div className="text-3xl font-semibold text-gray-900 dark:text-orange-300">{s.value}</div>
        </div>
      ))}
    </div>
  );
}
