import React from 'react';

export default function SearchBar({ value, onChange, onSubmit, onlyFree, onToggleFree }) {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center w-full">
      <div className="flex gap-2 items-center w-full md:max-w-xl">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit?.()}
          placeholder="Search courses, tags..."
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800/70 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
        />
        <button
          onClick={onSubmit}
          className="px-4 py-2 bg-orange-400 text-black font-semibold rounded-lg hover:bg-orange-500 transition-colors duration-300"
        >
          Search
        </button>
      </div>
      <label className="inline-flex items-center gap-2 text-sm text-gray-300 cursor-pointer select-none">
        <input type="checkbox" checked={!!onlyFree} onChange={(e) => onToggleFree?.(e.target.checked)} />
        Show only Free
      </label>
    </div>
  );
}
