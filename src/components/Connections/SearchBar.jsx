import React from 'react';

export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <div className="flex gap-2 items-center w-full max-w-xl">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSubmit?.()}
        placeholder="Search by name, title..."
        className="flex-1 px-4 py-2 rounded-lg bg-gray-800/70 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
      />
      <button
        onClick={onSubmit}
        className="px-4 py-2 bg-orange-400 text-black font-semibold rounded-lg hover:bg-orange-500 transition-colors duration-300"
      >
        Search
      </button>
    </div>
  );
}
